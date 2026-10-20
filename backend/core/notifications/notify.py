from backend.schemas.enum.notification_type import NotificationType
from backend.models import Notification

def notify(db, user_id, notification_type, ctx_user_id, ctx_article_id):

    if notification_type not in [p.value for p in NotificationType]:
        raise ValueError(f"invalid notification type: {notification_type}")

    notification = Notification(
        type = notification_type,
        user_id = user_id,
        ctx_user_id = ctx_user_id,
        ctx_article_id = ctx_article_id
    )

    db.add(notification)
    db.commit()