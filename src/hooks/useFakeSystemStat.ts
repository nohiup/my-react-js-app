import { useEffect, useState } from "react";

interface SystemStats {
  cpu: string;
  memUsed: string;
  memTotal: string;
  netRx: string;
  netTx: string;
}

export function useFakeSystemStats(refreshInterval = 1000): SystemStats {
  const [stats, setStats] = useState<SystemStats>({
    cpu: "0.0",
    memUsed: "0.0",
    memTotal: "16.0", // giả định máy có 16GB RAM
    netRx: "0.0",
    netTx: "0.0"
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: (Math.random() * 100).toFixed(1),
        memUsed: (Math.random() * 16).toFixed(1),
        memTotal: "16.0",
        netRx: (Math.random() * 500).toFixed(1),
        netTx: (Math.random() * 200).toFixed(1)
      });
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return stats;
}
