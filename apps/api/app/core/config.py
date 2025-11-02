from functools import lru_cache
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class AppSettings(BaseSettings):
    app_name: str = "Neihon API"
    environment: Literal["local", "test", "staging", "production"] = "local"
    version: str = "0.1.0"
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/neihon"
    openai_api_key: str = ""
    google_client_id: str = ""
    google_client_secret: str = ""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")


@lru_cache(maxsize=1)
def get_settings() -> AppSettings:
    return AppSettings()
