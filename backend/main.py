from pathlib import Path
from uuid import UUID, uuid4
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from config.database import engine
app = FastAPI(title="ClarityCXR API", version="0.2.0")
BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
MAX_FILE_SIZE = 10 * 1024 * 1024
ALLOWED_TYPES = {"image/jpeg", "image/png","image/webp"}
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
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
            detail="Only PNG and JPEG images are accepted.",
        )
    study_id = uuid4()
    mime_type = file.content_type
    extension = ".png" if mime_type == "image/png" else ".jpg"
    destination = UPLOAD_DIR / f"{study_id}{extension}"
    size = 0
    try:
        with destination.open("wb") as output:
            while chunk := await file.read(1024 * 1024):
                size += len(chunk)
                if size > MAX_FILE_SIZE:
                    raise HTTPException(
                        status_code=413,
                        detail="File exceeds the 10 MB limit.",
                    )
                output.write(chunk)
        if size == 0:
            raise HTTPException(
                status_code=400,
                detail="The uploaded file is empty.",
            )
        filename = Path(file.filename or "xray-image").name
        query = text("""
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
        with engine.begin() as connection:
            row = connection.execute(
                query,
                {
                    "id": study_id,
                    "filename": filename,
                    "storage_path": f"uploads/{destination.name}",
                    "mime_type": mime_type,
                    "size_bytes": size,
                },
            ).mappings().one()
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
@app.get("/studies/{study_id}")
def get_study(study_id: str):
    try:
        parsed_id = UUID(study_id)
    except ValueError:
        raise HTTPException(
            status_code=404,
            detail="Study not found.",
        )
    query = text("""
        SELECT id, original_filename, size_bytes, status, created_at
        FROM public.images
        WHERE id = :id
    """)
    try:
        with engine.connect() as connection:
            row = connection.execute(
                query, {"id": parsed_id}
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
