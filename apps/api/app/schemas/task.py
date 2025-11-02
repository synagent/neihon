from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.domain.enums import EnergyLevel, TaskContext, TaskPriority, TaskStatus


class TaskBase(BaseModel):
    title: str = Field(min_length=1, max_length=256)
    note: Optional[str] = Field(default=None, max_length=2048)
    energy: EnergyLevel = EnergyLevel.MEDIUM
    duration_minutes: Optional[int] = Field(default=None, ge=0, le=24 * 60)
    due_at: Optional[datetime] = None
    priority: TaskPriority = TaskPriority.MEDIUM
    context: Optional[TaskContext] = None
    status: TaskStatus = TaskStatus.PENDING

    model_config = ConfigDict(extra="ignore")


class TaskCreate(TaskBase):
    user_id: UUID


class TaskUpdate(BaseModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=256)
    note: Optional[str] = Field(default=None, max_length=2048)
    energy: Optional[EnergyLevel] = None
    duration_minutes: Optional[int] = Field(default=None, ge=0, le=24 * 60)
    due_at: Optional[datetime] = None
    priority: Optional[TaskPriority] = None
    context: Optional[TaskContext] = None
    status: Optional[TaskStatus] = None

    model_config = ConfigDict(extra="forbid")


class TaskRead(TaskBase):
    id: UUID
    user_id: UUID

    model_config = ConfigDict(from_attributes=True)
