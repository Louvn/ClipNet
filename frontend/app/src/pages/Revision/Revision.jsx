import { useNavigate, useParams } from "react-router-dom";
import Medium from "components/Medium";
import Loader from "components/Loader";
import { useRevision } from "../../hooks/api/useRevision";
import styles from "../Article/styles.module.css";
import specialStyles from "./styles.module.css";
import SimpleButton from "components/SimpleButton";
import Detail from "components/Detail";
import { formatTimestamp } from "../../utils/formatTimestamp";
import createdIcon from "assets/icons/created.png"
import changesIcon from "assets/icons/updated.png";
import { useTranslation } from "react-i18next";
import RestoreButton from "features/revisions/components/RestoreButton";
import ArticleView from "features/articles/components/ArticleView";
import Sidebar from "features/articles/components/Sidebar";
import { useArticle } from "hooks/api/useArticle";
import { useAuth } from "context/AuthContext";
import { useState } from "react";
import ActionLoading from "components/ActionLoading";
import ActionButton from "components/ActionButton";
import diffIcon from "assets/icons/diff.png";

function Revision() {

    // article slug and revision id
    const {id, slug} = useParams();
    const navigate = useNavigate();
    const {revision, previousRevisionId, loading: rLoading, status} = useRevision(id);
    const {article, loading: aLoading} = useArticle(slug);
    const {t} = useTranslation();
    const {user} = useAuth();
    const [isRestoring, setIsRestoring] = useState(false);


    if (rLoading || aLoading) return <Medium>
        <Loader />
    </Medium>;

    if (status === 404) return navigate("/404");

    if (isRestoring) return <ActionLoading text={t("revision.restoring")} />;
    
    if (!(aLoading || rLoading) && revision) return <Medium className={styles.ArticlePageRoot}>
        
        <Sidebar>

            <SimpleButton onClick={() => navigate(-1)} className={specialStyles.BackToHistory}>← {t("common.back")}</SimpleButton>

            <section>
                <h2>#{revision.id}</h2>

                <Detail
                    text={t("article.createdByUser", {user: revision.user.username, time: formatTimestamp(revision.created_at, t)})} 
                    icon={createdIcon} 
                    link={`/community/user/${revision.user.id}`}
                    />
                
                <Detail
                    text={revision.change_summary || t("revision.noSummary")}
                    icon={changesIcon}
                    />
            </section>

            <section>
                <h2>{t("common.actions")}</h2>

                {
                    article?.current_revision.id !== Number(id)
                    && (article?.contributors.includes(user.id) || article?.edit_permission < 2 || article?.op.id === user.id || user.is_admin)
                    && <RestoreButton revision={revision} slug={slug} setLoading={setIsRestoring}/>
                }

                {previousRevisionId && 
                    <ActionButton icon={diffIcon} onClick={() => navigate(`/wiki/${slug}/rev/${id}/diff/${previousRevisionId}`)}>{t("revision.diff")}</ActionButton>
                }
            </section>

        </Sidebar>

        <ArticleView rev={revision} warning={article?.current_revision.id !== Number(id) ? t("revision.oldRevisionWarning") : null} />

    </Medium>
}

export default Revision;