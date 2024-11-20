from pydantic import BaseModel

class TransactionBase(BaseModel):
    amount: float
    description: str
    date: str
    is_income: bool
    

class TransactionModel(TransactionBase):
    id: int
    user_id: int
    class Config:
        orm_mode = True       


class UserBase(BaseModel):
    username:str
    email: str
    pin: str

class UserModel(UserBase):
    id: int

    class Config:
        orm_mode = True

class UserRead(UserBase):
    id:int
    transactions: list[TransactionModel] = []

    class Config:
        orm_mode = True

class LoginBase(BaseModel):
    username:str
    pin: str

class TokenData(BaseModel):
    access_token: str
    token_type: str


