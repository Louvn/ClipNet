import { useEffect, useState } from "react";
import { useAPI } from "./useAPI";
import { useCache } from "context/CacheContext";

export function useRevision(id) {
    
    const [loading, setLoading] = useState(true);
    const [revision, setRevision] = useState(null);
    const [previousRevisionId, setPreviousRevisionId] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);

    const apiFetch = useAPI();
    const {cacheItem, getCachedItem} = useCache();

    useEffect(() => {

        if (!id) return;

        // cached?
        const cached = getCachedItem("revisions", id);
        if (cached) {
            setLoading(false);
            setRevision(cached.revision)
            setPreviousRevisionId(cached.previous_revision_id);
            return;
        }


        apiFetch(
            `/get-revision?${new URLSearchParams({ id: id })}`
        )
            .then(res => {
                setStatus(res.status);
                return res.json();
            })
            .then(data => {
                setRevision(data.revision)
                setPreviousRevisionId(data.previous_revision_id);
                cacheItem("revisions", id, data);
            })

            .catch(setError)

            .finally(() => setLoading(false))

    }, [apiFetch, id]);

    return {revision, previousRevisionId, loading, error, status};
}