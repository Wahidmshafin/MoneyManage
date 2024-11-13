from pydantic import BaseModel

class TransactionBase(BaseModel):
    amount: float
    description: str
    date: str
    is_income: bool

class TransactionModel(TransactionBase):
    id: int
    class Config:
        orm_mode = True       
