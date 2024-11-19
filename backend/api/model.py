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


class UserBase(BaseModel):
    username:str
    email: str
    pin: str

class UserModel(UserBase):
    id: int

    class Config:
        orm_mode = True

class LoginBase(BaseModel):
    username:str
    pin: str

class LoginModel(BaseModel):
    access_token: str
    token_type: str


