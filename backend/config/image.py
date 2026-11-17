from PIL import Image, UnidentifiedImageError
def validate_image(path: Path):
    try:
        with Image.open(path) as image:
            image.verify()
    except (UnidentifiedImageError, OSError):
        raise HTTPException(
            status_code=415,
            detail="Invalid or corrupted image."
        )