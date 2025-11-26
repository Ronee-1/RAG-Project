# Laporan Workflow 1
Telegram Bot – OpenAI – n8n

## 1. Tujuan
Workflow ini bertujuan untuk menghubungkan Telegram Bot dengan OpenAI melalui n8n sehingga pengguna dapat berinteraksi dengan AI melalui aplikasi Telegram.

## 2. Alur Kerja
1. Pengguna mengirim pesan melalui Telegram Bot
2. Pesan diterima oleh Telegram Trigger di n8n
3. Pesan diproses oleh OpenAI -> disini saya masih menggunakan GeminiAI
4. Hasil jawaban dikirim kembali ke Telegram

## 3. Teknologi yang Digunakan
- Telegram Bot API
- n8n Local via Docker
- Ngrok
- OpenAI API

## 4. Hasil Pengujian
Workflow berhasil diuji dengan mengirim pertanyaan melalui Telegram dan menerima balasan otomatis dari OpenAI.

## 5. Kesimpulan
Workflow 1 berhasil diimplementasikan dan berfungsi dengan baik sesuai tujuan.
