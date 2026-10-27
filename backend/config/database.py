import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL is missing. Check backend/.env"
    )
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
)
def test_connection():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
    return True
