from pydantic import BaseModel, constr
from datetime import datetime
from .user import UserData

class RevisionCreateData(BaseModel):
    title: constr(min_length=1, max_length=50)
    content: constr(min_length=1)
    change_summary: constr(max_length=255)
    article_id: int

class RevisionData(BaseModel):
    id: int
    title: str
    content: str
    user: UserData
    change_summary: str
    created_at: datetime