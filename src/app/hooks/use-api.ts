"use client";
import { useCallback, useEffect, useState } from "react";
import { api, publicApi, errMsg } from "@/lib/api";

export function useApi<T>(path: string | null, auth = true) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!!path);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!path) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      setData(await (auth ? api<T>(path) : publicApi<T>(path)));
    } catch (e) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
    }
  }, [path, auth]);

  useEffect(() => {
    void Promise.resolve().then(load);
  }, [load]);

  return { data, loading, error, reload: load };
}
