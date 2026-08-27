import { useState, useEffect, useCallback } from "react";
import { ApiError } from "../interfaces/types";

interface UseFetchResult<T> {
    data: T | null;
    error: ApiError | null;
    isLoading: boolean;
    refetch: () => void;
}


export function useFetch<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = []
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => setTrigger((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetcher()
      .then((result) => { if (!cancelled) setData(result); })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err : new ApiError("Error desconocido", "unknown"));
        }
      })
      .finally(() => { if (!cancelled) setIsLoading(false); });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, ...deps]);

  return { data, isLoading, error, refetch };
}