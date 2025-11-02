from datetime import datetime, timedelta

from typing import Optional

from fastapi import APIRouter
from pydantic import BaseModel, Field


router = APIRouter(prefix="/plan", tags=["plan"])


class TaskIn(BaseModel):
    id: Optional[str] = None
    title: str
    duration: int
    energy: Optional[str] = None
    context: Optional[str] = None
    priority: Optional[int] = 2


class Constraints(BaseModel):
    min_break: int = 10
    max_focus: int = 90
    work_hours: dict[str, str] = Field(default_factory=lambda: {"start": "09:00", "end": "17:00"})


class DayPlanRequest(BaseModel):
    date: datetime
    tasks: list[TaskIn]
    constraints: Constraints


class BlockOut(BaseModel):
    starts_at: datetime
    ends_at: datetime
    title: str
    type: str


@router.post("/day", response_model=list[BlockOut], summary="Generate a basic day plan")
def plan_day(req: DayPlanRequest) -> list[BlockOut]:
    """Return a trivial schedule — placeholder for real AI logic."""
    work_start = datetime.strptime(req.constraints.work_hours["start"], "%H:%M").time()
    start = datetime.combine(req.date.date(), work_start)

    blocks: list[BlockOut] = []
    for index, task in enumerate(req.tasks):
        block_start = start + timedelta(minutes=index * (task.duration + req.constraints.min_break))
        block_end = block_start + timedelta(minutes=task.duration)
        blocks.append(BlockOut(starts_at=block_start, ends_at=block_end, title=task.title, type="task"))

    return blocks
