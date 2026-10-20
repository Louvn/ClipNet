from fastapi import APIRouter

from .create_article import create_article
from .edit_article import edit_article
from .get_article import get_article
from .wiki_index import wiki_index
from .edit_permissions import edit_permissions
from .get_article_revisions import get_article_revisions
from .get_revision import get_revision
from .restore_revision import restore_revision

from backend.schemas.article import ArticleData
from backend.schemas.revision import RevisionData

router = APIRouter(tags=["articles"])

router.add_api_route(
    "/create-article",
    create_article,
    methods=["POST"],
    response_model=ArticleData
)

router.add_api_route(
    "/edit-article",
    edit_article,
    methods=["PUT"],
    response_model=RevisionData
)

router.add_api_route(
    "/get-article",
    get_article,
    methods=["GET"]
)

router.add_api_route(
    "/wiki-index",
    wiki_index,
    methods=["GET"]
)

router.add_api_route(
    "/edit-permissions",
    edit_permissions,
    methods=["PUT"]
)

router.add_api_route(
    "/get-article-revisions",
    get_article_revisions,
    methods=["GET"],
    response_model=list[RevisionData]
)

router.add_api_route(
    "/get-revision",
    get_revision,
    methods=["GET"]
)

router.add_api_route(
    "/restore-revision",
    restore_revision,
    methods=["PUT"],
    response_model=RevisionData
)