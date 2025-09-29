import { useEffect, useState } from "react";

export function useUTCClock(refreshInterval = 1000): string {
  const [time, setTime] = useState<string>(() => getCurrentUTC());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentUTC());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return time;
}

function getCurrentUTC(): string {
  const now = new Date();
  return now.toISOString().substring(11, 19) + " UTC"; // Lấy HH:mm:ss từ ISO string
}
