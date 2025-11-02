from __future__ import annotations

from enum import Enum
from typing import Any, Mapping, Optional, Sequence
from uuid import UUID

from anyio import to_thread

from app.repositories.base import TaskRepositoryProtocol
from src.models import Task


class TaskNotFoundError(Exception):
    """Raised when a task cannot be located."""


class TaskService:
    def __init__(self, repository: TaskRepositoryProtocol) -> None:
        self._repository = repository

    @staticmethod
    def _normalize_payload(data: Mapping[str, Any]) -> dict[str, Any]:
        normalized: dict[str, Any] = {}
        for key, value in data.items():
            if isinstance(value, Enum):
                normalized[key] = value.value
            else:
                normalized[key] = value
        return normalized

    async def list_tasks(self, user_id: Optional[UUID] = None) -> Sequence[Task]:
        return await to_thread.run_sync(lambda: self._repository.list_tasks(user_id=user_id))

    async def create_task(self, data: Mapping[str, Any]) -> Task:
        payload = self._normalize_payload(data)
        return await to_thread.run_sync(lambda: self._repository.create_task(payload))

    async def get_task(self, task_id: UUID) -> Task:
        task = await to_thread.run_sync(lambda: self._repository.get_task(task_id))
        if task is None:
            raise TaskNotFoundError(str(task_id))
        return task

    async def update_task(self, task_id: UUID, *, data: Mapping[str, object]) -> Task:
        existing = await to_thread.run_sync(lambda: self._repository.get_task(task_id))
        if existing is None:
            raise TaskNotFoundError(str(task_id))
        payload = self._normalize_payload(data)
        return await to_thread.run_sync(lambda: self._repository.update_task(existing, payload))

    async def delete_task(self, task_id: UUID) -> None:
        await to_thread.run_sync(lambda: self._repository.delete_task(task_id))
