from ..database import Base
from sqlalchemy import Column, Integer, Enum, ForeignKey, DateTime
from sqlalchemy.sql import func
from backend.schemas.enum.notification_type import NotificationType

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True)
    type = Column(Enum(NotificationType), nullable=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # context for notification
    ctx_article_id = Column(Integer, ForeignKey("articles.id", ondelete="CASCADE"), nullable=True)
    ctx_user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=True)