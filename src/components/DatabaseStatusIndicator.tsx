import React, { useState, useEffect } from 'react';
import { keepAliveService } from '../services/keepAlive';
import { Badge } from './ui/badge';
import { Database } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export const DatabaseStatusIndicator: React.FC = () => {
  const [lastPing, setLastPing] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const updateStatus = () => {
      setLastPing(keepAliveService.getLastPingTime());
      setIsRunning(keepAliveService.isRunning());
    };

    // Update immediately
    updateStatus();

    // Update every minute
    const interval = setInterval(updateStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  const getStatusVariant = () => {
    if (!isRunning || !lastPing) return 'destructive';
    
    const date = new Date(lastPing);
    const now = new Date();
    const diffDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
    
    if (diffDays < 3) return 'default';
    if (diffDays < 6) return 'secondary';
    return 'destructive';
  };

  const getTooltipText = () => {
    if (!isRunning) return 'Database KeepAlive tidak aktif';
    if (!lastPing) return 'Belum pernah ping database';
    
    const date = new Date(lastPing);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Database ping hari ini';
    if (diffDays === 1) return 'Database ping kemarin';
    return `Database ping ${diffDays} hari yang lalu`;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={getStatusVariant()} className="cursor-help">
            <Database className="w-3 h-3 mr-1" />
            DB
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};