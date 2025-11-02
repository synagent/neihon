from collections.abc import AsyncIterator, Iterator

import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_db_session
from app.main import app
from src.db import Base
from src import models as _models  # noqa: F401  # ensure model registration

TEST_DATABASE_URL = "sqlite+pysqlite:///:memory:"

engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    pool_pre_ping=True,
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False, class_=Session)


def override_get_db_session() -> Iterator[Session]:
    db = TestingSessionLocal()
    try:
        yield db
        db.commit()
    finally:
        if db.is_active:
            db.rollback()
        db.close()


@pytest_asyncio.fixture(autouse=True)
async def setup_database() -> AsyncIterator[None]:
    Base.metadata.create_all(bind=engine)
    app.dependency_overrides[get_db_session] = override_get_db_session
    try:
        yield
    finally:
        app.dependency_overrides.clear()
        Base.metadata.drop_all(bind=engine)


@pytest_asyncio.fixture
async def client() -> AsyncIterator[AsyncClient]:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as async_client:
        yield async_client
