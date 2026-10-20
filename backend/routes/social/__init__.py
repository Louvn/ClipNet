from fastapi import APIRouter
from .like import like, remove_like
from .create_comment import create_comment
from .get_comments import get_comments
from .get_notifications import get_notifications
from backend.schematics.comment import CommentOutData
from backend.schematics.notification import NotificationOutData

router = APIRouter(tags=["social"])

router.add_api_route(
    "/like/{article_id}",
    like, 
    methods=["POST"]
)

router.add_api_route(
    "/like/{article_id}",
    remove_like, 
    methods=["DELETE"]
)

router.add_api_route(
    "/create-comment",
    create_comment,
    methods=["POST"],
    response_model=CommentOutData
)

router.add_api_route(
    "/get-comments",
    get_comments,
    methods=["GET"],
    response_model=list[CommentOutData]
)

router.add_api_route(
    "/get-notifications",
    get_notifications,
    methods=["GET"],
    response_model=list[NotificationOutData]
)