LAPORAN PROGRES PEMBUATAN DATABASE VECTOR BERBASIS PINECONE
1. Pendahuluan
Database vector digunakan untuk menyimpan representasi numerik (embedding) dari dokumen teks agar dapat dilakukan pencarian berbasis kemiripan (semantic search). Pada progres ini, dilakukan pembangunan workflow otomatis untuk membaca file dari Google Drive, menghasilkan embedding menggunakan OpenAI, dan menyimpannya ke Pinecone.

2. Tujuan
Tujuan dari progres ini adalah:
Membangun workflow otomatis pengambilan file dari Google Drive.
Menghasilkan embedding dari dokumen menggunakan OpenAI.
Menyimpan hasil embedding ke dalam database vector Pinecone.
Mengunggah workflow ke GitHub sebagai dokumentasi kode.
Menyusun dokumentasi skema data dan arsitektur sistem.

3. Alur Workflow Sistem
Alur kerja sistem yang dibuat adalah sebagai berikut:
Google Drive Trigger
 Workflow akan aktif secara otomatis ketika terdapat file baru yang ditambahkan ke Google Drive.
Download File
 File yang terdeteksi kemudian diunduh secara otomatis oleh sistem.
Loop Over Items
 Jika terdapat lebih dari satu data, sistem akan memprosesnya satu per satu.
Generate Embedding (OpenAI)
 Dokumen yang telah diunduh diproses untuk menghasilkan embedding berupa vektor numerik.
Pinecone Vector Store
 Hasil embedding disimpan ke dalam database Pinecone sebagai vector store.

4. Skema Data
Skema data yang digunakan dalam penyimpanan ke Pinecone terdiri dari:
ID : Identitas unik tiap dokumen
Vector (Embedding) : Hasil embedding dari OpenAI
Metadata :
Nama file
Tipe file
Tanggal unggah
Sumber (Google Drive)

5. Arsitektur Sistem
Arsitektur sistem terdiri dari:
Sumber Data: Google Drive
Proses Otomatisasi: Workflow automation
Model AI: OpenAI Embedding
Database Vector: Pinecone
Repositori Kode: GitHub


Alur arsitektur:
Google Drive → Workflow Automation → OpenAI Embedding → Pinecone Vector Database → GitHub (versi workflow)

6. Output yang Dikumpulkan
Adapun hasil yang dikumpulkan sebagai berikut:
✅ Link GitHub Workflow
✅ Screenshot Hasil Embedding
✅ Screenshot Data Masuk ke Pinecone
Ketiga bukti tersebut menunjukkan bahwa sistem telah berhasil melakukan proses embedding dan penyimpanan ke database vector Pinecone.

7. Kendala yang Dihadapi
Beberapa kendala yang ditemui selama proses pengerjaan:
Terjadi error 403 akibat kesalahan API Key.
Terjadi mismatch dimensi vector (1536 vs 512).
Keterbatasan kuota API OpenAI (error 429).
Kendala tersebut berhasil diatasi dengan:
Memperbaiki API Key,
Menyesuaikan dimensi index Pinecone,
Mengatur ulang limit dan penggunaan API.

8. Kesimpulan
Berdasarkan progres yang telah dilakukan, sistem database vector berbasis Pinecone telah berhasil dibangun dengan alur:
Pembacaan file dari Google Drive,
Pembuatan embedding menggunakan OpenAI,
Penyimpanan vector ke Pinecone.
