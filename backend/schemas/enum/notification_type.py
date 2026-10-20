from enum import Enum

class NotificationType(str, Enum):

    article_comment = "article_comment"
    article_like = "article_like"
    article_edit = "article_edit"

    comment_reply = "comment_reply"
