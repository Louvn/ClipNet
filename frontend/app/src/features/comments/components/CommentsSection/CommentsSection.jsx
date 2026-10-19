import { useComments } from "hooks/api/useComments";
import styles from "./styles.module.css";
import { useState } from "react";
import SimpleButton from "components/SimpleButton";
import Loader from "components/Loader";
import Comment from "../Comment";
import { useTranslation } from "react-i18next";
import CommentInput from "../CommentInput";

function CommentsSection({article}) {

    const {t} = useTranslation();
    const {comments, commentsLoading, reloadComments} = useComments(article?.id);

    const [showCommentInput, setShowCommentInput] = useState(false);


    return <div className={styles.CommentSection}>
        <h2>
            {t("comments.title")}
            <SimpleButton onClick={() => setShowCommentInput(!showCommentInput)}>{showCommentInput ? t("actions.close") : t("comments.add")}</SimpleButton>
        </h2>
        <hr />

        {showCommentInput && <CommentInput afterPublish={reloadComments} article_id={article.id}/>}

        <div className={styles.Comments}>

            {!commentsLoading && comments?.length > 0 && comments?.map(e => <Comment 
                data={e} 
                key={e.id} 
                article_id={article.id} 
                reloadComments={reloadComments}
                canReply 
                />
            )}

            {commentsLoading && <Loader />}

            {!commentsLoading && comments?.length === 0 && <em>{t("comments.noComments")}</em>}
        </div>

    </div>
}

export default CommentsSection;