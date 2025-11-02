from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import plan
from app.core.config import get_settings


settings = get_settings()

app = FastAPI(title=settings.app_name, version=settings.version)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


@app.get("/health")
def health() -> dict[str, bool]:
    return {"ok": True}


app.include_router(plan.router)
