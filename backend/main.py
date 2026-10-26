from pathlib import Path
from uuid import uuid4
from datetime import datetime, timezone
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="ClarityCXR API", version="0.1.0")
BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
MAX_FILE_SIZE = 10 * 1024 * 1024
ALLOWED_TYPES = {"image/jpeg", "image/png"}
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
# Temporary storage. Records disappear when the server restarts.
studies: dict[str, dict] = {}
@app.get("/health")
def health():
    return {"status": "ok", "service": "ClarityCXR API"}
@app.post("/studies", status_code=201)
async def create_study(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=415,
            detail="Only PNG and JPEG images are accepted.",
        )
    study_id = str(uuid4())
    extension = ".png" if file.content_type == "image/png" else ".jpg"
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
        study = {
            "id": study_id,
            "filename": file.filename or "xray-image",
            "size_bytes": size,
            "status": "uploaded",
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        studies[study_id] = study
        return study
    except Exception:
        destination.unlink(missing_ok=True)
        raise
    finally:
        await file.close()
@app.get("/studies")
def list_studies():
    return list(studies.values())
@app.get("/studies/{study_id}")
def get_study(study_id: str):
    study = studies.get(study_id)
    if study is None:
        raise HTTPException(status_code=404, detail="Study not found.")
    return study
