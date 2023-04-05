import os

from dotenv import main
from sqlmodel import create_engine

main.load_dotenv()

engine = create_engine(os.getenv("DATABASE_URL"))
