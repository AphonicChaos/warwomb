from fastapi_crudrouter import SQLAlchemyCRUDRouter
from sqlalchemy.orm import sessionmaker

from warwomb.models import User

from warwomb.database import engine


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


def get_db():
    session = SessionLocal()
    try:
        yield session
        session.commit()
    finally:
        session.close()


users = SQLAlchemyCRUDRouter(
    prefix="users",
    schema=User,
    db_model=User,
    db=get_db
)
