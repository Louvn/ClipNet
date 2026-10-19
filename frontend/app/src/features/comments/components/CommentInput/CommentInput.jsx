import SimpleButton from "components/SimpleButton";
import { notificationTypeSuccess, useToastNotification } from "context/ToastNotificationContext";
import FormattingOptions from "features/editor/components/FormattingOptions";
import useUndoRedo from "features/editor/hooks/useUndoRedo";
import { useAPI } from "hooks/api/useAPI";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.css";

function CommentInput({ reply_to, afterPublish, article_id }) {
    
    const {value: commentInput, setValue: setCommentInput, undo, redo} = useUndoRedo("");
    const [postingComment, setPostingComment] = useState(false);

    const {t} = useTranslation();
    const apiFetch = useAPI();
    const toast = useToastNotification();
    const commentInputRef = useRef(null);


    const postComment = () => {
        if (!commentInput || !commentInput.trim()) return;
        setPostingComment(true);

        apiFetch("/create-comment", {
            method: "POST",
            body: JSON.stringify({
                article_id: article_id,
                content: commentInput,
                ...(reply_to ? {"parent_id": reply_to.id} : {})
            })
        })
            .then(res => {
                if (res.ok) {
                    toast(t("toast.commentPosted"), notificationTypeSuccess);
                    afterPublish();

                } else {
                    toast(t("toast.commentCouldNotBePosted"));
                }

                setPostingComment(false);
                setCommentInput("");
            })
    }

    return <div className={styles.CommentEditor}>
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
        </div>
}

export default CommentInput;