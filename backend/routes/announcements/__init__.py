from fastapi import APIRouter
from .get_announcements import get_announcements
from .create_announcement import create_announcement
from backend.schemas.announcement import AnnouncementData

router = APIRouter(tags=["announcements"])

router.add_api_route(
    "/get-announcements",
    get_announcements,
    methods=["GET"],
    response_model=list[AnnouncementData]
)

router.add_api_route(
    "/create-announcement",
    create_announcement,
    methods=["POST"],
    response_model=AnnouncementData
)