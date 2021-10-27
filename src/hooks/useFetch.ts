import { useState, useEffect } from 'react';

export const useFetch = <T>(request: RequestInfo, payload?: RequestInit | undefined, parser = 'json'): [T | undefined, boolean, Response | undefined] => {
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Response | undefined>();

  useEffect(() => {
    let isMounted = true;
    setError(undefined);
    const abortController = new AbortController();

    async function fetchData() {
      setLoading(true);
      const response = await fetch(request, { ...payload, signal: abortController.signal }).catch(err => {
        err.code !== 20 && setError(err);
      });

      if (response && isMounted) {
        if (response.status >= 400 && response.status < 600) {
          setError(response);
        } else {
          var parsed;
          switch (parser) {
            case 'text':
              parsed = await response.text();
              break;
            case 'blob':
              parsed = await response.blob();
              break;
            default:
              parsed = await response.json();
              break;
          }
          setData(parsed);
        }
      }
      setLoading(false);
    }

    if (request && payload) {
      fetchData();
    }

    const clean = () => {
      isMounted = false;
      abortController.abort();
    };
    return clean;
  }, [request, payload]);

  return [data, loading, error];
};
