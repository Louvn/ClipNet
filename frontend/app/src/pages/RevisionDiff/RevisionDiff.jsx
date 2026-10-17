import Medium from "components/Medium";
import styles from "./styles.module.css";
import articleViewStyles from "features/articles/components/ArticleView/styles.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { diffWords } from "diff";
import { useRevision } from "hooks/api/useRevision";
import Loader from "components/Loader";
import SimpleButton from "components/SimpleButton";
import { useTranslation } from "react-i18next";
import { useWikiIndex } from "context/WikiIndexContext";

function RevisionDiff() {

    const navigate = useNavigate();
    const {t} = useTranslation();

    const {oldId, newId, slug} = useParams();
    const {revision: oldRev, loading: oldLoading} = useRevision(oldId);
    const {revision: newRev, loading: newLoading, status: newStatus} = useRevision(newId);
    const diff = diffWords(oldRev?.content || "", newRev?.content || "");

    const wikiIndex = useWikiIndex();
    const article = Array.from(wikiIndex.values()).filter(e => e.slug === slug)[0];


    // stats
    const stats = diff.reduce(
        (result, part) => {

            if (part.added) result.added += part.count;
            if (part.removed) result.removed += part.count;
            return result;
        }, 
        {added: 0, removed: 0}
    );


    // loading
    if (oldLoading || newLoading) return <Medium>
        <Loader />
    </Medium>;

    // 404
    if (newStatus === 404) return navigate("/404");


    // site
    return <Medium className={styles.PageRoot}>

        <div className={styles.TopBar}>
            <SimpleButton onClick={() => navigate(-1)}>← {t("common.back")}</SimpleButton>
            <Link to={`/wiki/${slug}/rev/${oldId}`}>#{oldId}</Link> → 
            <Link to={`/wiki/${slug}/rev/${oldId}`}>#{oldId}</Link>

            <div className={styles.TopBarRight}>
                <span style={{color: "green"}}>+{stats.added}</span> / 
                <span style={{color: "red"}}>-{stats.removed}</span>
            </div>
        </div>

        <div className={articleViewStyles.ArticleView}>
            <h1 className={articleViewStyles.ArticleTitle}>{t("revision.diff")}</h1>
            <i>{article?.current_revision.title || "?"} / {t("revision.diff")}</i>
            <hr />
            <div className={articleViewStyles.ArticleContent}>
                {diff.map((part, idx) => (
                    <span 
                        key={idx}
                        className={`
                            ${part.added ? styles.Added : ""}
                            ${part.removed ? styles.Removed : ""}
                            `}
                        >
                        {part.value}
                    </span>
                ))}
            </div>
        </div>
    </Medium>
}

export default RevisionDiff;