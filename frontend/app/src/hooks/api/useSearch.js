import { cache, useEffect, useState } from "react"
import { useAPI } from "./useAPI";
import { useCache } from "../../context/CacheContext";

export function useSearch(query, filters, sort_by, offset, length) {

    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const {getCachedItem, cacheItem} = useCache();
    const apiFetch = useAPI();

    useEffect(() => {

        const body = {
            query,
            filters,
            sort_by,
            offset,
            length
        };
        const params = JSON.stringify(body);

        // cached?
        const cached = getCachedItem("search", params);
        if (cached) {
            setLoading(false);
            return setResults(cached);
        }

        setLoading(true);

        apiFetch(
            "/search",
            { method: "POST", body: JSON.stringify(body) }
        )
            .then(res => res.json())
            .then(data => {
                setResults(data);
                cacheItem("search", params, data);
            })

            .catch(setError)

            .finally(() => setLoading(false))


    }, [query, filters, sort_by, offset, length, apiFetch]);

    return {results, loading, error};
}