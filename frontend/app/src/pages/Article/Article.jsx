import { Navigate, useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useArticle } from "../../hooks/api/useArticle";

import ActionButton from "components/ActionButton";
import Detail from "components/Detail";
import Loader from "components/Loader";

import editIcon from "assets/icons/edit.png";
import revisionsIcon from "assets/icons/revisions.png";
import permissionsIcon from "assets/icons/permissions.png";

import createdIcon from "assets/icons/created.png"
import revisionIcon from "assets/icons/revision.png";
import updatedIcon from "assets/icons/updated.png";
import Medium from "components/Medium";
import { useAuth } from "../../context/AuthContext";
import LikeButton from "../../features/articles/components/LikeButton";
import ShareButton from "../../features/articles/components/ShareButton";
import { useTranslation } from "react-i18next";
import { formatTimestamp } from "../../utils/formatTimestamp";
import ReportButton from "../../features/articles/components/ReportButton";
import ArticleView from "features/articles/components/ArticleView";
import Sidebar from "features/articles/components/Sidebar";
import CommentsSection from "features/comments/components/CommentsSection";


function Article() {

    const {slug} = useParams();
    const {t} = useTranslation();

    const {article, loading, status} = useArticle(slug);
    const {user} = useAuth();
    const navigate = useNavigate();


    // Loading Animation
    if (loading) return <Medium>
        <Loader />
    </Medium>;

    if (status === 404) return <Navigate to="/404" />;


    // Article Page 
    if (article && status !== 404) return <Medium className={styles.ArticlePageRoot}>

        <Sidebar>

            <section>
                <h2>{t("common.details")}</h2>

                <Detail text={t("article.revisionCounter", {count: article.revision_count})} icon={revisionIcon} />
                <Detail 
                    text={t("article.createdByUser", {user: article.op.username, time: formatTimestamp(article.first_revision.created_at, t)})} 
                    icon={createdIcon} 
                    link={`/community/user/${article.op.id}`}
                    />
                <Detail 
                    text={t("article.lastEditedByUser", {user: article.current_revision.user.username, time: formatTimestamp(article.current_revision.created_at, t)})} 
                    icon={updatedIcon} 
                    link={`/community/user/${article.current_revision.user.id}`}
                    />
            </section>

            <section>
                <h2>{t("common.actions")}</h2>

                <LikeButton article={article} />
                <ShareButton title={article.current_revision.title} />
                <ReportButton article={article} />

                <hr />

                {
                    (article.edit_permission === 1 || article.op.id === user.id || article.contributors.includes(user.id) || user.is_admin)
                    && <ActionButton icon={editIcon} onClick={() => navigate(`/wiki/${slug}/edit`)}>{t("actions.edit")}</ActionButton>
                }
                <ActionButton icon={revisionsIcon} onClick={() => navigate(`/wiki/${slug}/history`)}>{t("revision.title")}</ActionButton>
                {   (article.op.id === user.id || user.is_admin)
                    && <ActionButton icon={permissionsIcon} onClick={() => navigate(`/wiki/${slug}/perms`)}>{t("permissions.title")}</ActionButton>
                }

            </section>

        </Sidebar>

        <ArticleView rev={article.current_revision} />

        <CommentsSection article={article}/>

    </Medium>
}

export default Article;