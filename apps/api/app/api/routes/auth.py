from fastapi import APIRouter

router = APIRouter()


@router.post("/login", summary="Authenticate a user")
async def login() -> dict[str, str]:
    return {"message": "Auth not implemented yet"}
