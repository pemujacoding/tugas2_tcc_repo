FROM node:20

# Set working directory ke /app saja supaya simpel
WORKDIR /app

# 1. Salin package file dulu (agar npm install bisa di-cache oleh Docker)
COPY backend/package*.json ./

# 2. Install dependensi
RUN npm install

# 3. Salin semua file dari folder backend ke folder /app di container
COPY backend/ .

# 4. EXPOSE port (hanya untuk dokumentasi, Cloud Run pakai env PORT)
EXPOSE 5000

# 5. Jalankan app.js (Karena di log kamu filenya app.js, bukan index.js)
CMD ["node", "app.js"]