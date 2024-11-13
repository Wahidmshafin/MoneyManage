from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session  
from typing import List
from database.model import Transaction
from database.connection import get_db
from ..model import TransactionBase, TransactionModel


router = APIRouter(prefix="/v1", tags=["v1"])

@router.post("/transaction", response_model=TransactionModel, status_code=status.HTTP_200_OK, summary="Create a new transaction")
async def create_transaction(transaction: TransactionBase, db: Session = Depends(get_db)):
    db_transaction = Transaction(**transaction.model_dump())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@router.get("/transaction/all", response_model=List[TransactionModel])
async def get_all_transactions(db: Session = Depends(get_db)):
    stmt = select(Transaction)
    transactions = db.scalars(stmt).all()
    return transactions
