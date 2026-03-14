1. Header Global (Navigasi Statis)
   Komponen: Teks logo tebal di kiri ("RiskNode"). Dua tautan di kanan: "Kalkulator" dan "Jurnal".
   Fungsi: Memungkinkan transisi instan antar dua halaman tanpa memuat ulang (SPA routing SvelteKit).

2. Halaman Utama (/ atau /calculator)
   Visual: Formulir satu kolom di tengah layar. Bersih, kontras tinggi.
   Alur:
   Pengguna memasukkan Modal (USDT), Risiko (%), Harga Masuk, dan Harga Berhenti Rugi.
   Di bawah formulir, sebuah kartu hasil secara real-time menampilkan "Ukuran Posisi yang Diizinkan". Angka ini berubah setiap kali pengguna mengetik (reaktivitas Svelte).
   Terdapat input teks tambahan opsional: "Pasangan Aset" (misal: BTC/USDT).
   Tombol besar di bagian bawah: "Simpan ke Jurnal".
   Aksi Tombol: Memvalidasi data. Jika valid, objek dimasukkan ke Svelte Store (yang memicu penyimpanan ke localStorage), menampilkan notifikasi sukses singkat, lalu mengosongkan formulir.

3. Halaman Jurnal (/journal)
   Visual: Tata letak dasbor berupa tabel data.
   Alur:
   Tabel membaca status dari localStorage saat dimuat.
   Kolom menampilkan: Tanggal, Aset, Ukuran Posisi, Risiko ($), dan Status.
   Di kolom status, terdapat menu tarik-turun (dropdown) atau tiga tombol kecil untuk setiap baris: "Set Menang", "Set Kalah", "Hapus".
   Aksi Tombol: Memperbarui atribut status pada objek spesifik di dalam array localStorage.

4. Footer Global
   Komponen: Teks kecil di tengah bawah.
   Isi: "Dibangun untuk TestSprite Hackathon. Bukan Saran Keuangan." Tidak ada tautan eksternal yang tidak berguna.

Colout Palette

1. Latar Belakang Global (Background):
   Terang: bg-slate-50 (Abu-abu sangat terang, bersih)
   Gelap: dark:bg-slate-900 (Biru keabu-abuan pekat, tidak terlalu hitam pekat agar mata tidak lelah)

2. Permukaan Kartu & Formulir (Surface):
   Terang: bg-white border border-slate-200
   Gelap: dark:bg-slate-800 dark:border-slate-700

3. Teks Utama (Typography):
   Terang: text-slate-900 (Judul) dan text-slate-600 (Label/Paragraf)
   Gelap: dark:text-slate-50 (Judul) dan dark:text-slate-400 (Label/Paragraf)

4. Aksi Utama (Tombol Simpan/Hitung):
   Terang: bg-blue-600 hover:bg-blue-700 text-white
   Gelap: dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white

5. Indikator Keberhasilan (Status Menang / Rasio Positif):
   Terang: text-emerald-700 bg-emerald-100 (Teks hijau gelap di atas latar belakang hijau pucat)
   Gelap: dark:text-emerald-400 dark:bg-emerald-900/30

6. Indikator Risiko/Kerugian (Status Kalah / Peringatan Stop Loss):
   Terang: text-rose-700 bg-rose-100
   Gelap: dark:text-rose-400 dark:bg-rose-900/30
