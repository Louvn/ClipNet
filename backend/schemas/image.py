from pydantic import BaseModel, constr
from .user import UserData
from datetime import datetime

class ImageData(BaseModel):
    id: int
    user: UserData
    created_at: datetime
    url: str
    description: constr(max_length=255)