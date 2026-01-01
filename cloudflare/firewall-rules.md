# Aturan Firewall (Keamanan Server)

Strategi keamanan: **Strict (Ketata)**.
Karena menggunakan Cloudflare Tunnel, kita TIDAK perlu membuka port 80/443 atau 5678 ke publik.

## 1. Kebijakan Default
- **Incoming (Masuk):** DENY (Tolak semua secara default)
- **Outgoing (Keluar):** ALLOW (Izinkan server menghubungi internet)

## 2. Port yang Diizinkan (Allow List)

| Port | Protocol | Layanan | Keterangan |
| :--- | :--- | :--- | :--- |
| **22** | TCP | SSH | Akses remote admin (Wajib). Sebaiknya batasi ke IP rumah/kantor Anda jika memungkinkan. |

## 3. Port yang Dilarang/Ditutup (Explicitly Denied)

| Port | Layanan | Alasan |
| :--- | :--- | :--- |
| **5678** | n8n | Tidak boleh diakses langsung via IP Publik. Akses hanya boleh lewat Tunnel (`n8n.iather.site`). |
| **80** | HTTP | Tidak diperlukan (Tunnel menangani traffic HTTP). |
| **443** | HTTPS | Tidak diperlukan (Tunnel menangani traffic HTTPS). |
| **3306/5432** | Database | Jangan pernah membuka port database ke publik. |

## 4. Implementasi (Contoh dengan UFW di Ubuntu)

```bash
# Reset firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Izinkan SSH (Hati-hati, pastikan port benar)
sudo ufw allow 22/tcp

# Aktifkan firewall
sudo ufw enable