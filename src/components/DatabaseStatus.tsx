import React, { useState, useEffect } from 'react';
import { keepAliveService } from '../services/keepAlive';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Activity, Database, Clock, RefreshCw } from 'lucide-react';

export const DatabaseStatus: React.FC = () => {
  const [lastPing, setLastPing] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState(false);
  const [isServiceRunning, setIsServiceRunning] = useState(false);

  useEffect(() => {
    // Update status setiap menit
    const interval = setInterval(() => {
      setLastPing(keepAliveService.getLastPingTime());
      setIsServiceRunning(keepAliveService.isRunning());
    }, 60000);

    // Initial load
    setLastPing(keepAliveService.getLastPingTime());
    setIsServiceRunning(keepAliveService.isRunning());

    return () => clearInterval(interval);
  }, []);

  const handleManualPing = async () => {
    setIsPinging(true);
    try {
      await keepAliveService.manualPing();
      setLastPing(keepAliveService.getLastPingTime());
    } finally {
      setIsPinging(false);
    }
  };

  const handleToggleService = () => {
    if (isServiceRunning) {
      keepAliveService.stop();
    } else {
      keepAliveService.start();
    }
    setIsServiceRunning(keepAliveService.isRunning());
  };

  const formatLastPing = (timestamp: string | null) => {
    if (!timestamp) return 'Belum pernah ping';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} hari ${diffHours} jam yang lalu`;
    } else if (diffHours > 0) {
      return `${diffHours} jam ${diffMinutes} menit yang lalu`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} menit yang lalu`;
    } else {
      return 'Baru saja';
    }
  };

  const getStatusColor = (timestamp: string | null) => {
    if (!timestamp) return 'destructive';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
    
    if (diffDays < 3) return 'default';
    if (diffDays < 6) return 'secondary';
    return 'destructive';
  };

  const formatPingDate = (timestamp: string | null) => {
    if (!timestamp) return '-';
    
    const date = new Date(timestamp);
    return date.toLocaleString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Status Database Supabase
        </CardTitle>
        <CardDescription>
          Monitor uptime database untuk mencegah pause pada free plan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Status Service
            </label>
            <Badge variant={isServiceRunning ? 'default' : 'destructive'}>
              {isServiceRunning ? 'Aktif' : 'Tidak Aktif'}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Interval Ping
            </label>
            <p className="text-sm text-muted-foreground">
              {keepAliveService.getPingIntervalFormatted()}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Ping Terakhir</label>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Badge variant={getStatusColor(lastPing)}>
                {formatLastPing(lastPing)}
              </Badge>
              <p className="text-xs text-muted-foreground">
                {formatPingDate(lastPing)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleManualPing}
            disabled={isPinging}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isPinging ? 'animate-spin' : ''}`} />
            {isPinging ? 'Pinging...' : 'Manual Ping'}
          </Button>
          
          <Button 
            size="sm" 
            variant={isServiceRunning ? "destructive" : "default"}
            onClick={handleToggleService}
          >
            {isServiceRunning ? 'Stop Service' : 'Start Service'}
          </Button>
        </div>

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <h4 className="text-sm font-medium text-blue-800 mb-1">
            ℹ️ Informasi
          </h4>
          <p className="text-xs text-blue-700">
            Service ini akan melakukan ping ke database setiap 5 hari untuk mencegah 
            Supabase free plan mem-pause project karena inaktivitas. 
            Batas inaktivitas adalah 7 hari.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};