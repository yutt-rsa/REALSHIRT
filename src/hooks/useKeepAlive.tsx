import { useState, useEffect } from 'react';
import { keepAliveService } from '../services/keepAlive';

export const useKeepAlive = () => {
  const [isRunning, setIsRunning] = useState(keepAliveService.isRunning());
  const [lastPingTime, setLastPingTime] = useState<string | null>(keepAliveService.getLastPingTime());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRunning(keepAliveService.isRunning());
      setLastPingTime(keepAliveService.getLastPingTime());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const startService = () => {
    keepAliveService.start();
    setIsRunning(true);
  };

  const stopService = () => {
    keepAliveService.stop();
    setIsRunning(false);
  };

  const manualPing = async () => {
    await keepAliveService.manualPing();
    setLastPingTime(keepAliveService.getLastPingTime());
  };

  const getPingInterval = () => keepAliveService.getPingIntervalFormatted();

  return {
    isRunning,
    lastPingTime,
    startService,
    stopService,
    manualPing,
    getPingInterval,
  };
};