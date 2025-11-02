from fastapi import APIRouter

from app.api.routes import auth, calendar, health, plan, routines, tasks

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(tasks.router, prefix="/tasks", tags=["tasks"])
api_router.include_router(routines.router, prefix="/routines", tags=["routines"])
api_router.include_router(plan.router)
api_router.include_router(calendar.router, prefix="/calendar", tags=["calendar"])
