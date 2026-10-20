from backend.database import get_db
from backend.core.security.jwt_helpers import get_current_user
from backend.schemas.comment import CommentData
from backend.models import Comment
from fastapi import Depends

def get_comments(article_id, db = Depends(get_db), user = Depends(get_current_user)):

    comments = (
        db.query(Comment)
            .filter(
                Comment.article_id == article_id, 
                Comment.parent_id.is_(None)
                )
            .order_by(Comment.created_at.desc())
            .all()
            )

    return [CommentData.model_validate(c, from_attributes=True) for c in comments]