import { Link } from "react-router-dom";
import wikitextToJsx from "wikitext-engine";
import styles from "./styles.module.css";
import wikitextStyles from "wikitext-engine/styles.module.css";
import { formatTimestamp } from "utils/formatTimestamp";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import CommentInput from "../CommentInput";

function Comment({ data, article_id, reloadComments, canReply = false }) {

    const rendered = wikitextToJsx(data.content, false);
    const {t} = useTranslation();
    const [showInput, setShowInput] = useState(false);

    return <div className={`${styles.Comment} ${canReply ? styles.CanReply : ""}`}>

        <div className={styles.CommentMetaData}>
            <Link to={`/community/user/${data.user.id}`} className={wikitextStyles.UserLink}>@{data.user.username}</Link>
            <span className={styles.CommentDatetime}>{formatTimestamp(data.created_at, t)}</span>
        </div>

        <span className={styles.CommentContent}>{rendered}</span>

        {canReply && <div className={styles.Replies}>

            {data.replies?.map(e => <Comment data={e} key={e.id} />)}

            {canReply && <button className={styles.ReplyButton} onClick={() => setShowInput(true)}>
                ↳ {t("comments.reply")}
            </button>}

            {showInput && <CommentInput reply_to={data} article_id={article_id} afterPublish={() => {setShowInput(false); reloadComments()}}/>}
        </div>}

    </div>
}

export default Comment;