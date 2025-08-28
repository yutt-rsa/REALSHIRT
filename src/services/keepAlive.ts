import { supabase } from '@/integrations/supabase/client';

export class KeepAliveService {
  private intervalId: NodeJS.Timeout | null = null;
  
  // Ping database setiap 5 hari (432000000 ms)
  private readonly PING_INTERVAL = 5 * 24 * 60 * 60 * 1000;
  
  start() {
    if (this.intervalId) return; // Sudah berjalan
    
    // Ping pertama kali
    this.pingDatabase();
    
    // Setup interval
    this.intervalId = setInterval(() => {
      this.pingDatabase();
    }, this.PING_INTERVAL);
    
    console.log('KeepAlive service started - will ping every 5 days');
  }
  
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('KeepAlive service stopped');
    }
  }
  
  private async pingDatabase() {
    try {
      // Query ringan ke database untuk menjaga koneksi tetap aktif
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);
        
      if (error) {
        console.warn('Database ping failed:', error.message);
      } else {
        console.log('Database ping successful at:', new Date().toISOString());
        // Simpan timestamp ping terakhir ke localStorage
        localStorage.setItem('last_db_ping', new Date().toISOString());
      }
    } catch (error) {
      console.error('Database ping error:', error);
    }
  }
  
  // Method untuk ping manual jika diperlukan
  async manualPing() {
    await this.pingDatabase();
  }
  
  // Cek kapan ping terakhir
  getLastPingTime(): string | null {
    return localStorage.getItem('last_db_ping');
  }
  
  // Cek status apakah service sedang berjalan
  isRunning(): boolean {
    return this.intervalId !== null;
  }
  
  // Get interval dalam milidetik
  getPingInterval(): number {
    return this.PING_INTERVAL;
  }
  
  // Format interval untuk display
  getPingIntervalFormatted(): string {
    const days = Math.floor(this.PING_INTERVAL / (24 * 60 * 60 * 1000));
    return `${days} hari`;
  }
}

export const keepAliveService = new KeepAliveService();