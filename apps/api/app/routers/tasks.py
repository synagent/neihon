from datetime import datetime
from typing import List, Optional
from uuid import uuid4

from fastapi import APIRouter, Depends, Header, HTTPException, Query, status
from pydantic import BaseModel, Field

import os

router = APIRouter(prefix="/tasks", tags=["tasks"])

# --- Auth (optional): require Bearer if NEIHON_API_KEY is set ---
API_KEY = os.getenv("NEIHON_API_KEY", "").strip()


def require_auth(authorization: Optional[str] = Header(None)):
    if not API_KEY:
        return  # open if not configured
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Missing Bearer token")
    token = authorization.split(" ", 1)[1].strip()
    if token != API_KEY:
        raise HTTPException(status_code=403, detail="Invalid token")


# --- Schemas ---
class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=280)
    notes: Optional[str] = Field(None, max_length=4000)
    due_at: Optional[datetime] = None
    priority: Optional[str] = Field("normal", pattern="^(low|normal|high)$")


class TaskOut(BaseModel):
    id: str
    title: str
    notes: Optional[str] = None
    due_at: Optional[datetime] = None
    priority: str = "normal"
    created_at: datetime
    source: str = "neihon"


# --- In-memory store (persistent only for process lifetime) ---
_TASKS: List[TaskOut] = []


# --- Endpoints ---
@router.post("", response_model=TaskOut, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_auth)])
def create_task(payload: TaskCreate):
    task = TaskOut(
        id=str(uuid4()),
        title=payload.title.strip(),
        notes=(payload.notes.strip() if payload.notes else None),
        due_at=payload.due_at,
        priority=payload.priority or "normal",
        created_at=datetime.utcnow(),
    )
    _TASKS.insert(0, task)
    del _TASKS[200:]
    return task


@router.get("", response_model=List[TaskOut], dependencies=[Depends(require_auth)])
def list_tasks(
    limit: int = Query(10, ge=1, le=100),
    q: Optional[str] = Query(None, description="Optional text filter on title/notes"),
):
    items = _TASKS
    if q:
        ql = q.lower()
        items = [t for t in items if ql in t.title.lower() or (t.notes and ql in t.notes.lower())]
    return items[:limit]


@router.get("/{task_id}", response_model=TaskOut, dependencies=[Depends(require_auth)])
def get_task(task_id: str):
    for t in _TASKS:
        if t.id == task_id:
            return t
    raise HTTPException(status_code=404, detail="Task not found")
