from fastapi import APIRouter

router = APIRouter()


@router.get("/events", summary="List calendar events")
async def list_calendar_events() -> list[dict[str, str]]:
    return []
