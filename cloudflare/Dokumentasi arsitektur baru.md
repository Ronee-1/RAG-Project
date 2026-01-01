graph LR
    User[User / Admin] -- "Buka Browser" --> CF[Cloudflare Edge]
    ExtApp[Aplikasi Lain] -- "Kirim Webhook" --> CF

    subgraph "Cloudflare Network"
        CF -- "SSL Termination & DDoS Protection" --> Tunnel[Cloudflare Tunnel]
    end

    subgraph "Server / VPS Anda"
        Tunnel -- "Secure Tunnel (No Open Ports)" --> Cloudflared[Cloudflared Service]
        Cloudflared -- "http://localhost:5678" --> Docker[Docker Container: n8n]
    end

    Docker -- "Simpan Data" --> Volume[(Docker Volume: n8n_data)]

    

B. Penjelasan Komponen
Dual Domain Strategy:

n8n.iather.site: Digunakan khusus untuk Anda (Admin) mengakses antarmuka visual n8n.

webhook.iather.site: Digunakan khusus untuk menerima data dari luar (trigger).

Keuntungan: Jika webhook terkena serangan spam/DDoS, antarmuka editor (n8n) tetap bisa diakses untuk perbaikan karena jalurnya bisa dipisah rules-nya di Cloudflare.

Docker Container:

Container berjalan terisolasi.

Environment Variable WEBHOOK_URL memaksa n8n untuk men-generate link menggunakan domain webhook, bukan domain editor.

Port 5678 di-binding ke localhost server, sehingga aman dari scan port publik.

Keamanan (Security Layers):

Layer 1 (DNS/Cloudflare): Menyembunyikan IP asli server.

Layer 2 (Tunnel): Tidak ada port terbuka di firewall server.

Layer 3 (Aplikasi): Webhook URL terpisah menjaga privasi URL Editor.