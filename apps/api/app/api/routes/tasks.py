from __future__ import annotations

from typing import Optional, Sequence
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.api.deps import get_task_service
from app.schemas.task import TaskCreate, TaskRead, TaskUpdate
from app.services.tasks import TaskNotFoundError, TaskService
from src.models import Task

router = APIRouter()


def _serialize_collection(tasks: Sequence[Task]) -> list[TaskRead]:
    return [TaskRead.model_validate(task) for task in tasks]


@router.get("/", summary="List tasks", response_model=list[TaskRead])
async def list_tasks(
    user_id: Optional[UUID] = Query(default=None),
    service: TaskService = Depends(get_task_service),
) -> list[TaskRead]:
    tasks = await service.list_tasks(user_id=user_id)
    return _serialize_collection(tasks)


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    summary="Create a task",
    response_model=TaskRead,
)
async def create_task(
    payload: TaskCreate,
    service: TaskService = Depends(get_task_service),
) -> TaskRead:
    created = await service.create_task(payload.model_dump())
    return TaskRead.model_validate(created)


@router.get(
    "/{task_id}",
    summary="Retrieve a task",
    response_model=TaskRead,
)
async def get_task(
    task_id: UUID,
    service: TaskService = Depends(get_task_service),
) -> TaskRead:
    try:
        task = await service.get_task(task_id)
    except TaskNotFoundError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found") from exc
    return TaskRead.model_validate(task)


@router.put(
    "/{task_id}",
    summary="Update a task",
    response_model=TaskRead,
)
async def update_task(
    task_id: UUID,
    payload: TaskUpdate,
    service: TaskService = Depends(get_task_service),
) -> TaskRead:
    update_data = payload.model_dump(exclude_none=True)
    if not update_data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields provided for update")
    try:
        task = await service.update_task(task_id, data=update_data)
    except TaskNotFoundError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found") from exc
    return TaskRead.model_validate(task)


@router.delete(
    "/{task_id}",
    summary="Delete a task",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_task(
    task_id: UUID,
    service: TaskService = Depends(get_task_service),
) -> None:
    await service.delete_task(task_id)
