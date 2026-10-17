from backend.database import get_db
from backend.core.security.jwt_helpers import get_current_user
from fastapi import Depends, HTTPException
from backend.models import Revision
from backend.schematics.revision import RevisionOutData

def get_revision(id: int, db = Depends(get_db), user = Depends(get_current_user)):

    revision = db.query(Revision).filter(Revision.id == id).first()

    if not revision or revision.article.is_deleted:
        raise HTTPException(404, "REVISION_NOT_FOUND")

    previous_revision = (
        db.query(Revision)
            .filter(
                Revision.article_id == revision.article_id,
                Revision.created_at < revision.created_at
            )
            .order_by(Revision.created_at.desc())
            .first()
    )

    return {"revision": RevisionOutData.model_validate(revision, from_attributes=True), "previous_revision_id": previous_revision.id if previous_revision else None}