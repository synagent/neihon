from __future__ import annotations

from typing import Optional, Sequence
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from src.models import Task


class SQLAlchemyTaskRepository:
    def __init__(self, session: Session) -> None:
        self._session = session

    def list_tasks(self, user_id: Optional[UUID] = None) -> Sequence[Task]:
        stmt = select(Task)
        if user_id is not None:
            stmt = stmt.where(Task.user_id == user_id)
        return list(self._session.execute(stmt).scalars().all())

    def get_task(self, task_id: UUID) -> Optional[Task]:
        stmt = select(Task).where(Task.id == task_id)
        return self._session.execute(stmt).scalar_one_or_none()

    def create_task(self, data: dict) -> Task:
        task = Task(**data)
        self._session.add(task)
        self._session.flush()
        self._session.refresh(task)
        return task

    def update_task(self, task: Task, data: dict) -> Task:
        for key, value in data.items():
            setattr(task, key, value)
        self._session.add(task)
        self._session.flush()
        self._session.refresh(task)
        return task

    def delete_task(self, task_id: UUID) -> None:
        task = self.get_task(task_id)
        if task is None:
            return
        self._session.delete(task)
        self._session.flush()
