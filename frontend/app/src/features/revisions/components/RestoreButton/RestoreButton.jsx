import { useState } from "react";
import restoreIcon from "assets/icons/revisions.png"
import { useAPI } from "hooks/api/useAPI";
import { notificationTypeSuccess, useToastNotification } from "context/ToastNotificationContext";
import { useCache } from "context/CacheContext";
import { useNavigate } from "react-router-dom";
import ActionButton from "components/ActionButton";
import ConfirmPopUp from "components/ConfirmPopUp";
import { useTranslation } from "react-i18next";

function RestoreButton({revision, slug, setLoading}) {

    const apiFetch = useAPI();
    const navigate = useNavigate();
    const toast = useToastNotification();
    const {cacheItem} = useCache();
    const [popUpOpen, setPopUpOpen] = useState(false);
    const {t} = useTranslation();

    const rollbackToRevision = async () => {

        setLoading(true);

        const params = new URLSearchParams({ revision_id: revision.id });
        const res = await apiFetch(`/restore-revision?${params}`, { method: "PUT"});

        if (!res.ok) {
            setLoading(false);
            return;
        }

        cacheItem("articles", slug, null);

        toast(t("toast.revisionRestored"), notificationTypeSuccess);
        return navigate(`/wiki/${slug}`);
    }


    return <>
        <ActionButton icon={restoreIcon} onClick={() => setPopUpOpen(true)}>{t("revision.restore")}</ActionButton>

        {popUpOpen && <ConfirmPopUp
            title={t("revision.restore")}
            text={t("revision.restoreInfo")}
            onConfirm={() => rollbackToRevision()}
            onCancel={() => setPopUpOpen(false)}
            />}
    </>
}

export default RestoreButton;