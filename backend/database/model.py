from typing import List
from sqlalchemy import ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, DeclarativeBase, relationship


class Base(DeclarativeBase):
    pass

class Transaction(Base):
    __tablename__ = "transaction"
    id: Mapped[int] = mapped_column(primary_key=True)
    amount: Mapped[float] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column()
    date: Mapped[str] = mapped_column(nullable=False)
    is_income: Mapped[bool] = mapped_column(nullable=False)

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)

    user: Mapped["User"] = relationship(back_populates="transactions")


class User(Base):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(unique=True, nullable=False)
    email: Mapped[str] = mapped_column(nullable=False)
    pin: Mapped[str] = mapped_column(nullable=False)

    transactions: Mapped[List["Transaction"]] = relationship(back_populates="user", cascade=["all"])



