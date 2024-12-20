import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.orm import Session  
from typing import List
from database.model import Transaction, User
from database.connection import get_db
from ..model import TransactionBase, TransactionModel, UserBase, UserModel, LoginBase, TokenData


router = APIRouter(prefix="/v1", tags=["v1"])

oauh2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


def get_user(username: str, db: Session = Depends(get_db)):
    stmt = select(User).where(User.username == username)
    return db.scalars(stmt).first()

async def get_current_user(token: str = Depends(oauh2_scheme), db:Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, "secret", algorithms=["HS256"])
        username: str = payload.get("username")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        
        user = get_user(username, db)
        if user is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        
        return user


    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    

@router.get("/me", response_model=UserModel, status_code=status.HTTP_200_OK, summary="Get current user information")
async def get_current_user_info(currentUser:str = Depends(get_current_user)):
    return currentUser

@router.post("/transaction", response_model=TransactionModel, status_code=status.HTTP_200_OK, summary="Create a new transaction")
async def create_transaction(transaction: TransactionBase, currentUser:str=Depends(get_current_user), db: Session = Depends(get_db)):
    # db_transaction = Transaction(**transaction.model_dump())
    db_transaction = Transaction(amount=transaction.amount, description=transaction.description, is_income = transaction.is_income, date = transaction.date, user_id=currentUser.id)

    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@router.get("/transaction/all", response_model=List[TransactionModel])
async def get_all_transactions(currentUser:str = Depends(get_current_user), db: Session = Depends(get_db)):
    # stmt = select(Transaction)
    # transactions = db.scalars(stmt).all()
    return currentUser.transactions


@router.post("/login", response_model=TokenData, status_code=status.HTTP_200_OK, summary="Login a user")
async def login_user(user: LoginBase, db: Session = Depends(get_db)):
    db_user = get_user(user.username, db)
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid username")
    
    if bcrypt.checkpw( user.pin.encode(), db_user.pin.encode()):
        token = jwt.encode({"username": user.username, "exp":datetime.now(tz=timezone.utc)+timedelta(hours=1)}, "secret", algorithm="HS256")
        return {"access_token": token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=401, detail="Invalid pin")


@router.post("/register", response_model= UserModel, status_code = status.HTTP_200_OK, summary= "Register a new user")
async def register_user(user:UserBase, db:Session = Depends(get_db)):
    db_check = get_user(user.username, db)
    # check if username already exists
    if db_check:
        raise HTTPException(status_code=400, detail="Username already exists")
    # db_user = User(**user.model_dump())
    salt = bcrypt.gensalt()
    hash_pin = bcrypt.hashpw(user.pin.encode('utf-8'), salt)
    db_user = User(username=user.username, email = user.email, pin=hash_pin.decode())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user