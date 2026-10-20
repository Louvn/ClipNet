from backend.database import get_db
from backend.core.security.jwt_helpers import get_current_user
from backend.models import Notification
from fastapi import Depends

def get_notifications(db = Depends(get_db), user = Depends(get_current_user)):

    notifications = db.query(Notification).filter(Notification.user_id == user.id).all()

    return notifications
