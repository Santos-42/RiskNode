1. Objektif Bisnis:Menyediakan alat presisi matematis bagi trader kripto amatir untuk menghitung ukuran posisi maksimum berdasarkan toleransi risiko, dan mencatat eksekusi tersebut secara lokal untuk evaluasi.

2. Logika Bisnis Inti (Mesin Kalkulator):Aplikasi tidak boleh menebak. Aplikasi harus menghitung secara deterministik menggunakan rumus ini:
   $$\text{Ukuran Posisi} = \frac{\text{Total Modal} \times (\text{Persentase Risiko} / 100)}{|\text{Harga Masuk} - \text{Harga Berhenti Rugi}|}$$
   Batasan Logika yang Harus Ditangani (Ini yang akan diserang oleh AI TestSprite):Pembagian dengan Nol: Jika Harga Masuk sama dengan Harga Berhenti Rugi, sistem harus menampilkan pesan kesalahan yang jelas ("Jarak harga tidak valid") dan menonaktifkan tombol simpan.Batas Risiko: Sistem menolak secara keras (hard block) input Persentase Risiko di atas 5%. Trader yang merisikokan lebih dari itu sedang berjudi, bukan berdagang.Input Negatif: Semua input angka tidak boleh bernilai kurang dari nol.

3. Logika Penyimpanan (Jurnal):Data disimpan dalam bentuk array objek JSON di dalam localStorage.Struktur Objek: id (unik), tanggal, pasangan_aset, modal, risiko, harga_masuk, harga_berhenti_rugi, ukuran_posisi, status (Terbuka, Menang, Kalah).
