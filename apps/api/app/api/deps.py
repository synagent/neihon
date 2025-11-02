from collections.abc import Iterator

from fastapi import Depends
from sqlalchemy.orm import Session

from app.repositories.sqlalchemy import SQLAlchemyTaskRepository
from app.services.tasks import TaskService
from src.db import get_session


def get_db_session() -> Iterator[Session]:
    with get_session() as session:
        yield session


def get_task_service(session: Session = Depends(get_db_session)) -> Iterator[TaskService]:
    repository = SQLAlchemyTaskRepository(session=session)
    yield TaskService(repository=repository)
