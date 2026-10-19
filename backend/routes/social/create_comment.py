from backend.database import get_db
from backend.core.security.jwt_helpers import get_current_user
from backend.schematics.comment import CommentCreateData
from backend.models import Comment, Article
from fastapi import Depends, HTTPException

def create_comment(data: CommentCreateData, db = Depends(get_db), user = Depends(get_current_user)):

    existing_article = db.query(Article).filter(Article.id == data.article_id, Article.is_deleted.is_(False)).first()
    if not existing_article: raise HTTPException(404, "ARTICLE_NOT_FOUND")

    comment = Comment(
        article_id = data.article_id,
        user = user,
        content = data.content
    )

    if data.parent_id:
        parent = db.query(Comment).filter(Comment.id == data.parent_id, Comment.article_id == data.article_id).first()

        if not parent:
            raise HTTPException(404, "COMMENT_NOT_FOUND")
        
        if parent.parent_id:
            comment.parent_id = parent.parent_id
        else:
            comment.parent_id = data.parent_id

    db.add(comment)
    db.commit()

    db.refresh(comment)

    return comment