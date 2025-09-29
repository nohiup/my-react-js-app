import React from 'react';
import { useFakeSystemStats } from "../hooks/useFakeSystemStat";
import { useUTCClock } from '../hooks/useUTCClock';

const Footer: React.FC = () => {
  const { cpu, memUsed, memTotal, netRx, netTx } = useFakeSystemStats(1000);
  const utcTime = useUTCClock();
  return (
    <footer className="h-8 app-background border-t border-primary flex items-center justify-between px-4 text-xs text-normal">
      <div className="flex items-center space-x-4">
        <span>CPU: {cpu}%</span>
        <span>MEM: {memUsed}GB / {memTotal}GB</span>
        <span>NET: ↓{netRx}KB/s / ↑{netTx}KB/s</span>
      </div>
      <div className="flex items-center space-x-4">
        <span>pmhub • main</span>
        <span>✓</span>
        <span>{utcTime}</span>
        <span className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span>READY</span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;