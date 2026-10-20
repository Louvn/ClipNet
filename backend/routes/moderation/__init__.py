from fastapi import APIRouter
from .ban import ban
from .unban import unban
from .report_article import report_article
from .get_pending_reports import get_pending_reports
from .delete_article import delete_article
from .get_own_report import get_own_report
from backend.schemas.user import UserData
from backend.schemas.report import ReportData

router = APIRouter(tags=["moderation"])

router.add_api_route(
    "/ban",
    ban,
    methods=["PUT"],
    response_model=UserData
)

router.add_api_route(
    "/unban",
    unban,
    methods=["PUT"],
    response_model=UserData
)

router.add_api_route(
    "/report-article",
    report_article,
    methods=["POST"],
    response_model=ReportData
)

router.add_api_route(
   "/get-pending-reports",
    get_pending_reports,
    methods=["GET"],
    response_model=list[ReportData]
)

router.add_api_route(
    "/get-own-report",
    get_own_report,
    methods=["GET"],
    response_model=ReportData | None
)

router.add_api_route(
    "/delete-article",
    delete_article,
    methods=["DELETE"]
)