import { useComments } from "hooks/api/useComments";
import styles from "./styles.module.css";
import { useAPI } from "hooks/api/useAPI";
import { notificationTypeSuccess, useToastNotification } from "context/ToastNotificationContext";
import { useRef, useState } from "react";
import FormattingOptions from "features/editor/components/FormattingOptions";
import SimpleButton from "components/SimpleButton";
import Loader from "components/Loader";
import Comment from "../Comment";
import { useTranslation } from "react-i18next";
import useUndoRedo from "features/editor/hooks/useUndoRedo";

function CommentsSection({article}) {

    const {t} = useTranslation();
    const {comments, commentsLoading, reloadComments} = useComments(article?.id);
    const apiFetch = useAPI();
    const toast = useToastNotification();
    const commentInputRef = useRef(null);

    const {value: commentInput, setValue: setCommentInput, undo, redo} = useUndoRedo("");
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [postingComment, setPostingComment] = useState(false);


    const postComment = () => {
        if (!commentInput || !commentInput.trim()) return;
        setPostingComment(true);

        apiFetch("/create-comment", {
            method: "POST",
            body: JSON.stringify({
                article_id: article.id,
                content: commentInput
            })
        })
            .then(res => {
                if (res.ok) {
                    toast(t("toast.commentPosted"), notificationTypeSuccess)
                    reloadComments();

                } else {
                    toast(t("toast.commentCouldNotBePosted"));
                }

                setPostingComment(false);
                setCommentInput("");
            })
    }

    return <div className={styles.CommentSection}>
        <h2>
            {t("comments.title")}
            <SimpleButton onClick={() => setShowCommentInput(!showCommentInput)}>{showCommentInput ? t("actions.close") : t("comments.add")}</SimpleButton>
        </h2>
        <hr />

        {showCommentInput && <div className={styles.CommentEditor}>
            <FormattingOptions
                inputRef={commentInputRef}
                textState={commentInput}
                changeTextState={setCommentInput}
                fullMode={false}
                undo={undo}
                redo={redo}
                />
                
            <input type="text" ref={commentInputRef} value={commentInput} onChange={(e) => setCommentInput(e.currentTarget.value)} placeholder={t("placeholder.comment")} />
            <SimpleButton onClick={postComment} disabled={postingComment} className={styles.PostButton}>{t("comments.post")}</SimpleButton>
        </div>}

        <div className={styles.Comments}>

            {!commentsLoading && comments?.length > 0 && comments?.map(e => <Comment data={e} key={e.created_at} />)}

            {commentsLoading && <Loader />}

            {!commentsLoading && comments?.length === 0 && <em>{t("comments.noComments")}</em>}
        </div>

    </div>
}

export default CommentsSection;