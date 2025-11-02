from fastapi import APIRouter

router = APIRouter()


@router.get("/", summary="List routines")
async def list_routines() -> list[dict[str, str]]:
    return []
