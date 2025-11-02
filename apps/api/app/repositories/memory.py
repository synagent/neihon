from __future__ import annotations

from typing import Optional, Sequence
from uuid import UUID

from app.domain.models import Task
from app.repositories.base import TaskRepositoryProtocol


class InMemoryTaskRepository(TaskRepositoryProtocol):
    def __init__(self) -> None:
        self._items: dict[UUID, Task] = {}

    def list_tasks(self, user_id: Optional[UUID] = None) -> Sequence[Task]:
        if user_id is None:
            return list(self._items.values())
        return [task for task in self._items.values() if task.user_id == user_id]

    def get_task(self, task_id: UUID) -> Optional[Task]:
        return self._items.get(task_id)

    def create_task(self, data: dict) -> Task:
        task = Task(**data)
        self._items[task.id] = task
        return task

    def update_task(self, task: Task, data: dict) -> Task:
        for key, value in data.items():
            setattr(task, key, value)
        self._items[task.id] = task
        return task

    def delete_task(self, task_id: UUID) -> None:
        self._items.pop(task_id, None)

    def clear(self) -> None:
        self._items.clear()
