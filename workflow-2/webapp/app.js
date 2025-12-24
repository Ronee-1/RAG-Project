const express = require('express');
const axios = require('axios');
const path = require('path');
// const open = require('open'); <--- Dihapus karena menyebabkan error

const app = express();
const PORT = 3000;

// === KONFIGURASI ===
// Ganti URL ini dengan URL Production Webhook n8n Anda yang aktif
// Pastikan n8n sudah di-deploy/active agar tidak error 404
const N8N_WEBHOOK_URL = 'https://berniece-gangliar-sally.ngrok-free.dev/webhook/bc3934df-8d10-48df-9960-f0db1e806328';

// Middleware untuk membaca data JSON dari request frontend
app.use(express.json());

// 1. ROUTE UTAMA: Menampilkan halaman UI (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. API CHAT: Menerima pesan dari UI -> Kirim ke n8n -> Balikan jawaban ke UI
app.post('/api/chat', async (req, res) => {
    const { question, sessionId } = req.body;

    // Log di terminal server untuk debugging
    console.log(`[Masuk] User (${sessionId}): ${question}`);

    try {
        // Mengirim request ke n8n
        const response = await axios.post(N8N_WEBHOOK_URL, {
            question: question,
            sessionId: sessionId
        });

        // n8n bisa mengembalikan jawaban dengan berbagai nama variabel
        // Kode ini mengecek satu per satu agar tidak error "undefined"
        const reply = response.data.answer || 
                      response.data.reply || 
                      response.data.output || 
                      response.data.text ||
                      "Maaf, tidak ada respon dari AI.";
        
        console.log(`[Keluar] AI: ${reply}`);
        
        // Mengirim jawaban bersih kembali ke frontend
        res.json({ answer: reply });

    } catch (error) {
        console.error("Error connecting to n8n:", error.message);
        
        // Menangani error jika n8n mati atau URL salah
        let errorMsg = "Gagal menghubungi AI.";
        
        if (error.response) {
            console.error("Detail Error:", error.response.data);
            if (error.response.status === 404) {
                errorMsg = "Webhook n8n tidak ditemukan (404). Pastikan URL benar dan Workflow AKTIF.";
            } else {
                errorMsg = `Server Error: ${error.response.status}`;
            }
        } else if (error.code === 'ECONNREFUSED') {
            errorMsg = "Tidak bisa terkoneksi ke server n8n.";
        }
        
        res.status(500).json({ error: errorMsg });
    }
});

// Menjalankan Server
app.listen(PORT, () => {
    console.log(`\n=== SERVER AI BERJALAN ===`);
    console.log(`Akses di browser: http://localhost:${PORT}`);
    console.log(`Webhook Target  : ${N8N_WEBHOOK_URL}`);
    console.log(`==========================\n`);
    
    // Fitur auto-open dihapus agar server berjalan stabil
});