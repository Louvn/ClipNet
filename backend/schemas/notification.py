from pydantic import BaseModel
from .enum.notification_type import NotificationType
from datetime import datetime

class NotificationData(BaseModel):
    id: int
    type: NotificationType
    created_at: datetime
    ctx_article_id: int = None
    ctx_user_id: int = None