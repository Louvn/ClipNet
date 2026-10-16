import { Link, useNavigate, useParams } from "react-router-dom";
import Medium from "components/Medium";
import { useRevisions } from "../../hooks/api/useRevisions";
import styles from "./styles.module.css";
import Loader from "components/Loader";
import React from "react";
import { useTranslation } from "react-i18next";
import { formatTimestamp } from "utils/formatTimestamp";
import SimpleButton from "components/SimpleButton";
import { useWikiIndex } from "context/WikiIndexContext";

function ArticleHistory() {

    const {slug} = useParams();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {revisions, loading, status} = useRevisions(slug);

    const wikiIndex = useWikiIndex();
    const article = Array.from(wikiIndex.values()).filter(e => e.slug === slug)[0];

    if (loading) return <Medium>
        <Loader />
    </Medium>;

    if (status === 404) return navigate("/404");


    if (revisions) return <Medium className={styles.HistoryPageRoot}>

        <SimpleButton 
            onClick={() => navigate(-1)}
            className={styles.TopBarButton}
            >
            ← {t("common.back")}
        </SimpleButton>

        <div className={styles.TopCenter}>
            <h1 className={styles.HistoryHeading}>{t("revision.title")}</h1>
            <i>{article.current_revision.title} / {t("revision.title")}</i>
        </div>
        {
            revisions.map((rev, idx, array) => (
                <React.Fragment key={rev.id}>
                    { new Date(array[idx-1]?.created_at).toDateString() !== new Date(rev.created_at).toDateString() 
                    && <h2 className={styles.Date}>{formatTimestamp(rev.created_at, t)}</h2> }

                    <Link to={`/wiki/${slug}/rev/${rev.id}`} className={styles.Revision}>
                        <h3 className={styles.ID}>#{rev.id}</h3> 
                        <i>{rev.change_summary || "-"}</i>
                        <Link to={`/community/user/${rev.user.id}`} className={styles.User}>@{rev.user.username}</Link>
                    </Link>
                </React.Fragment>
                )
            )
        }
    </Medium>
}

export default ArticleHistory;