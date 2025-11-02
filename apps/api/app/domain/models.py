from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4

from app.domain.enums import EnergyLevel, TaskContext, TaskPriority, TaskStatus


@dataclass
class Task:
    user_id: UUID
    title: str
    note: Optional[str] = None
    energy: EnergyLevel = EnergyLevel.MEDIUM
    duration_minutes: Optional[int] = None
    due_at: Optional[datetime] = None
    priority: TaskPriority = TaskPriority.MEDIUM
    context: Optional[TaskContext] = None
    status: TaskStatus = TaskStatus.PENDING
    id: UUID = field(default_factory=uuid4)
