from __future__ import annotations

from datetime import date, datetime, time
from typing import List, Optional
from uuid import UUID, uuid4

from sqlalchemy import Boolean, CHAR, Date, DateTime, ForeignKey, Integer, JSON, String, Text, Time, TypeDecorator, func
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db import Base


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now()
    )


class GUID(TypeDecorator):
    impl = CHAR
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql":
            return dialect.type_descriptor(PGUUID(as_uuid=True))
        return dialect.type_descriptor(CHAR(32))

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        if isinstance(value, UUID):
            return value if dialect.name == "postgresql" else value.hex
        value_uuid = UUID(str(value))
        return value_uuid if dialect.name == "postgresql" else value_uuid.hex

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        return value if isinstance(value, UUID) else UUID(str(value))


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[UUID] = mapped_column(GUID(), primary_key=True, default=uuid4)
    email: Mapped[str] = mapped_column(String(320), unique=True, nullable=False)
    full_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

    tasks: Mapped[List["Task"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    routines: Mapped[List["Routine"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    focus_blocks: Mapped[List["FocusBlock"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )
    ai_suggestions: Mapped[List["AISuggestion"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )


class Task(Base, TimestampMixin):
    __tablename__ = "tasks"

    id: Mapped[UUID] = mapped_column(GUID(), primary_key=True, default=uuid4)
    user_id: Mapped[UUID] = mapped_column(GUID(), ForeignKey("users.id", ondelete="CASCADE"))
    title: Mapped[str] = mapped_column(String(256), nullable=False)
    note: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    energy: Mapped[Optional[str]] = mapped_column(String(16), nullable=True)
    duration_minutes: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    due_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    priority: Mapped[Optional[str]] = mapped_column(String(16), nullable=True)
    context: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    status: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)

    user: Mapped["User"] = relationship(back_populates="tasks")


class Routine(Base, TimestampMixin):
    __tablename__ = "routines"

    id: Mapped[UUID] = mapped_column(GUID(), primary_key=True, default=uuid4)
    user_id: Mapped[UUID] = mapped_column(GUID(), ForeignKey("users.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(160), nullable=False)
    days: Mapped[List[str]] = mapped_column(JSON, nullable=False, default=list)
    start_time: Mapped[Optional[time]] = mapped_column(Time(timezone=False), nullable=True)
    duration_minutes: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    context: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    user: Mapped["User"] = relationship(back_populates="routines")


class FocusBlock(Base, TimestampMixin):
    __tablename__ = "focus_blocks"

    id: Mapped[UUID] = mapped_column(GUID(), primary_key=True, default=uuid4)
    user_id: Mapped[UUID] = mapped_column(GUID(), ForeignKey("users.id", ondelete="CASCADE"))
    starts_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    ends_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    label: Mapped[Optional[str]] = mapped_column(String(160), nullable=True)
    source: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)

    user: Mapped["User"] = relationship(back_populates="focus_blocks")


class AISuggestion(Base, TimestampMixin):
    __tablename__ = "ai_suggestions"

    id: Mapped[UUID] = mapped_column(GUID(), primary_key=True, default=uuid4)
    user_id: Mapped[UUID] = mapped_column(GUID(), ForeignKey("users.id", ondelete="CASCADE"))
    date: Mapped[date] = mapped_column(Date, nullable=False)
    plan_json: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    accepted: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    user: Mapped["User"] = relationship(back_populates="ai_suggestions")
