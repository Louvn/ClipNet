from pydantic import BaseModel, constr
from .article import ArticleData
from .user import UserData
from datetime import datetime

class ReportArticleData(BaseModel):
    article_id: int
    reason: constr(max_length=255)

class ReportData(BaseModel):
    article: ArticleData
    user: UserData
    reason: constr(max_length=255)
    created_at: datetime
    pending: bool