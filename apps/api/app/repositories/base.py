from __future__ import annotations

from typing import Optional, Protocol, Sequence
from uuid import UUID

from src.models import Task


class TaskRepositoryProtocol(Protocol):
    def list_tasks(self, user_id: Optional[UUID] = None) -> Sequence[Task]:
        ...

    def get_task(self, task_id: UUID) -> Optional[Task]:
        ...

    def create_task(self, data: dict) -> Task:
        ...

    def update_task(self, task: Task, data: dict) -> Task:
        ...

    def delete_task(self, task_id: UUID) -> None:
        ...
