from pydantic import BaseModel, constr, field_validator
from typing import Optional
from .enum.content_type import ContentType
from .revision import RevisionOutData
from .user import UserOutData
from .enum.permissions import EditPermission

class ArticleCreateData(BaseModel):
    title: constr(min_length=1, max_length=50)
    content: constr(min_length=1)

class ArticleOutData(BaseModel):
    type: ContentType = ContentType.article
    id: int
    slug: str
    op: UserOutData
    current_revision: RevisionOutData
    first_revision: RevisionOutData
    revision_count: Optional[int] = None
    edit_permission: int
    contributors: Optional[list[int]] = None
    liked_by: Optional[list[int]] = None

    @field_validator("liked_by", "contributors", mode="before")
    @classmethod
    def convert(cls, value):
        return [el.user_id for el in value]

class ArticleGetData(BaseModel):
    id: Optional[int] = None
    slug: Optional[str] = None

class ArticlePermissionsData(BaseModel):
    id: int
    edit_permission: EditPermission
    contributors: list[int]