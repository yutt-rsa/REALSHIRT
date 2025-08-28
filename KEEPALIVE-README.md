# Database KeepAlive System

## Overview
Sistem KeepAlive ini dirancang untuk mencegah Supabase free plan mem-pause database karena inaktivitas. Supabase free plan akan mem-pause project setelah 1 minggu tidak ada aktivitas.

## Komponen Utama

### 1. KeepAliveService (`src/services/keepAlive.ts`)
Service utama yang mengelola ping ke database:
- **Interval**: 5 hari (432,000,000 ms)
- **Target**: Query ringan ke tabel `profiles`
- **Tracking**: Menyimpan timestamp ping terakhir di localStorage

#### Methods:
- `start()`: Memulai service dan interval ping
- `stop()`: Menghentikan service
- `manualPing()`: Melakukan ping manual
- `getLastPingTime()`: Mengambil timestamp ping terakhir
- `isRunning()`: Cek status service
- `getPingIntervalFormatted()`: Format interval untuk display

### 2. DatabaseStatus Component (`src/components/DatabaseStatus.tsx`)
Komponen UI untuk monitoring status database:
- Menampilkan status service (aktif/tidak aktif)
- Menunjukkan waktu ping terakhir dengan color coding
- Tombol manual ping dan toggle service
- Informasi interval ping

#### Color Coding:
- **Hijau (default)**: < 3 hari
- **Abu-abu (secondary)**: 3-6 hari  
- **Merah (destructive)**: > 6 hari atau tidak pernah ping

### 3. useKeepAlive Hook (`src/hooks/useKeepAlive.tsx`)
Custom hook untuk integrasi yang mudah:
- Auto-update status setiap 30 detik
- Methods untuk kontrol service
- State management untuk komponen

### 4. Auto-Start Integration (`src/App.tsx`)
Service dimulai otomatis saat aplikasi load:
```typescript
useEffect(() => {
  keepAliveService.start();
  return () => {
    keepAliveService.stop();
  };
}, []);
```

## Cara Kerja

1. **Auto Start**: Service dimulai otomatis saat aplikasi dimuat
2. **Ping Schedule**: Melakukan ping setiap 5 hari
3. **Query Ringan**: `SELECT id FROM profiles LIMIT 1`
4. **Tracking**: Menyimpan timestamp di localStorage
5. **Monitoring**: Admin dapat melihat status di panel admin

## Keuntungan

- **Otomatis**: Tidak perlu intervensi manual
- **Ringan**: Query minimal untuk menghemat resources
- **Monitoring**: Dashboard untuk tracking status
- **Flexibel**: Bisa di-stop/start sesuai kebutuhan
- **Resilient**: Tetap jalan meski ada error sesekali

## Lokasi Monitoring

Admin dapat memantau status database di:
**Admin Panel → Database Status Section**

## Catatan Keamanan

- Query hanya READ operation
- Tidak mengubah data apapun
- Menggunakan Supabase client yang sudah dikonfigurasi
- Respect Row Level Security policies

## Troubleshooting

### Service Tidak Jalan
1. Cek console untuk error
2. Restart manual dari admin panel
3. Verify Supabase connection

### Ping Gagal
1. Cek koneksi internet
2. Verify Supabase credentials
3. Cek RLS policies untuk tabel profiles

## Monitoring Rekomendasi

- Cek status setiap beberapa hari
- Lakukan manual ping jika diperlukan
- Monitor console logs untuk error