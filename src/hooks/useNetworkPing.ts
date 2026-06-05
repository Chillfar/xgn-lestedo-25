import { useState, useEffect, useRef, useCallback } from "react";

export interface PingResult {
  /** Connection status: "online" | "offline" | "slow" */
  status: "online" | "offline" | "slow";
  /** Round-trip time in milliseconds, null if offline */
  latencyMs: number | null;
  /** Timestamp of the last successful ping */
  lastChecked: Date | null;
}

/**
 * Pings an external endpoint periodically and reports network status + latency.
 * Uses a lightweight favicon fetch with cache-busting to measure RTT.
 */
export default function useNetworkPing(intervalMs: number = 5000): PingResult {
  const [result, setResult] = useState<PingResult>({
    status: navigator.onLine ? "online" : "offline",
    latencyMs: null,
    lastChecked: null,
  });

  const abortRef = useRef<AbortController | null>(null);

  const doPing = useCallback(async () => {
    if (!navigator.onLine) {
      setResult({ status: "offline", latencyMs: null, lastChecked: new Date() });
      return;
    }

    // Cancel any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const start = performance.now();

    try {
      // Use Google's generate_204 — tiny response, CORS-friendly
      await fetch("https://www.google.com/generate_204", {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-store",
        signal: controller.signal,
      });

      const latency = Math.round(performance.now() - start);
      const status = latency > 500 ? "slow" : "online";

      setResult({ status, latencyMs: latency, lastChecked: new Date() });
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      setResult({ status: "offline", latencyMs: null, lastChecked: new Date() });
    }
  }, []);

  useEffect(() => {
    // Initial ping
    doPing();

    // Periodic pings
    const id = setInterval(doPing, intervalMs);

    // Listen for online/offline events for instant feedback
    const handleOnline = () => doPing();
    const handleOffline = () =>
      setResult({ status: "offline", latencyMs: null, lastChecked: new Date() });

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      clearInterval(id);
      abortRef.current?.abort();
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [doPing, intervalMs]);

  return result;
}
