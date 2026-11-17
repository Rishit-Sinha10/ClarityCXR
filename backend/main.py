from pathlib import Path
from uuid import UUID, uuid4
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.concurrency import run_in_threadpool
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from sqlalchemy import text
from config.database import engine
app = FastAPI(title="ClarityCXR API", version="0.2.0")
BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

MAX_FILE_SIZE = 10 * 1024 * 1024
CHUNK_SIZE = 1024 * 1024

EXTENSIONS = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}
ALLOWED_TYPES = set(EXTENSIONS)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=False,
    allow_methods=[
        "GET",
        "POST",
        "DELETE",
        "OPTIONS",
    ],
    allow_headers=["*"],
)


def format_study(row):
    return {
        "id": str(row["id"]),
        "filename": row["original_filename"],
        "size_bytes": row["size_bytes"],
        "status": row["status"],
        "created_at": row["created_at"],
    }


def detect_image_type(header: bytes) -> str | None:
    """Identify the real image type from its magic bytes."""
    if header.startswith(b"\xff\xd8\xff"):
        return "image/jpeg"
    if header.startswith(b"\x89PNG\r\n\x1a\n"):
        return "image/png"
    if len(header) >= 12 and header[:4] == b"RIFF" and header[8:12] == b"WEBP":
        return "image/webp"
    return None


INSERT_STUDY_SQL = text("""
    INSERT INTO public.images (
        id,
        original_filename,
        storage_path,
        mime_type,
        size_bytes,
        status
    )
    VALUES (
        :id,
        :filename,
        :storage_path,
        :mime_type,
        :size_bytes,
        'uploaded'
    )
    RETURNING
        id, original_filename, size_bytes, status, created_at
""")


def insert_study(params: dict):
    with engine.begin() as connection:
        return connection.execute(INSERT_STUDY_SQL, params).mappings().one()


@app.get("/health")
def health():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {
            "status": "ok",
            "service": "ClarityCXR API",
            "database": "connected",
        }
    except Exception:
        raise HTTPException(
            status_code=503,
            detail="Database connection failed.",
        )


@app.post("/studies", status_code=201)
async def create_study(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=415,
            detail="Only PNG, JPEG and WebP images are accepted.",
        )

    # Read the first chunk up front so we can verify the real file type
    # instead of trusting the client-supplied Content-Type header.
    first_chunk = await file.read(CHUNK_SIZE)
    if not first_chunk:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty.",
        )

    detected_type = detect_image_type(first_chunk)
    if detected_type is None or detected_type != file.content_type:
        raise HTTPException(
            status_code=415,
            detail="File content does not match a valid PNG, JPEG or WebP image.",
        )

    study_id = uuid4()
    mime_type = detected_type
    extension = EXTENSIONS[mime_type]
    destination = UPLOAD_DIR / f"{study_id}{extension}"
    size = 0

    try:
        with destination.open("wb") as output:
            chunk = first_chunk
            while chunk:
                size += len(chunk)
                if size > MAX_FILE_SIZE:
                    raise HTTPException(
                        status_code=413,
                        detail="File exceeds the 10 MB limit.",
                    )
                await run_in_threadpool(output.write, chunk)
                chunk = await file.read(CHUNK_SIZE)

        filename = Path(file.filename or "xray-image").name

        row = await run_in_threadpool(
            insert_study,
            {
                "id": study_id,
                "filename": filename,
                "storage_path": f"uploads/{destination.name}",
                "mime_type": mime_type,
                "size_bytes": size,
            },
        )
        return format_study(row)

    except HTTPException:
        destination.unlink(missing_ok=True)
        raise
    except Exception:
        destination.unlink(missing_ok=True)
        raise HTTPException(
            status_code=500,
            detail="Could not save the study. Check the backend logs.",
        )
    finally:
        await file.close()

@app.get("/studies")
def list_studies():
    query = text("""
        SELECT id, original_filename, size_bytes, status, created_at
        FROM public.images
        ORDER BY created_at DESC
    """)

    try:
        with engine.connect() as connection:
            rows = connection.execute(query).mappings().all()
        return [format_study(row) for row in rows]
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Could not retrieve studies.",
        )
# study_id is annotated as UUID, so FastAPI already validates and parses it.
# A malformed ID returns 422 automatically.
@app.get("/studies/{study_id}")
def get_study(study_id: UUID):
    query = text("""
        SELECT id, original_filename, size_bytes, status, created_at
        FROM public.images
        WHERE id = :id
    """)

    try:
        with engine.connect() as connection:
            row = connection.execute(
                query, {"id": study_id}
            ).mappings().first()

        if row is None:
            raise HTTPException(
                status_code=404,
                detail="Study not found.",
            )
        return format_study(row)

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Could not retrieve the study.",
        )
@app.get("/studies/{study_id}/image")
def get_study_image(study_id: UUID):
    query = text("""
        SELECT storage_path, mime_type
        FROM public.images
        WHERE id = :id
    """)

    try:
        with engine.connect() as connection:
            row = connection.execute(
                query, {"id": study_id}
            ).mappings().first()

        if row is None:
            raise HTTPException(status_code=404, detail="Study not found.")

        image_path = (BASE_DIR / row["storage_path"]).resolve()

        # Prevent paths outside the uploads directory.
        if not image_path.is_relative_to(UPLOAD_DIR.resolve()):
            raise HTTPException(status_code=400, detail="Invalid image path.")

        if not image_path.is_file():
            raise HTTPException(status_code=404, detail="Image file not found.")

        return FileResponse(
            image_path,
            media_type=row["mime_type"],
            filename=image_path.name,
            content_disposition_type="inline",
        )
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Could not retrieve the image.",
        )
@app.delete("/studies/{study_id}", status_code=204)
def delete_study(study_id: UUID):
    query = text("""
        SELECT storage_path
        FROM public.images
        WHERE id = :id
    """)

    try:
        with engine.begin() as connection:
            row = connection.execute(
                query, {"id": study_id}
            ).mappings().first()

            if row is None:
                raise HTTPException(
                    status_code=404,
                    detail="Study not found.",
                )

            image_path = (BASE_DIR / row["storage_path"]).resolve()

            if not image_path.is_relative_to(UPLOAD_DIR.resolve()):
                raise HTTPException(
                    status_code=400,
                    detail="Invalid image path.",
                )

            connection.execute(
                text("DELETE FROM public.images WHERE id = :id"),
                {"id": study_id},
            )

        image_path.unlink(missing_ok=True)

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Could not delete the study.",
        )