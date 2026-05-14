const express = require("express");
const cors = require("cors");
// Pastikan koneksi database tidak bikin crash kalau gagal
const sequelize = require("./config/database"); 

const app = express();

// 1. CORS harus di atas sebelum route
app.use(cors());
app.use(express.json());

// 2. Satu saja route untuk "/"
app.get("/", (req, res) => {
  res.send("Hello World! Backend is running.");
});

const noteRoutes = require("./routes/noteRoutes");
app.use("/notes", noteRoutes);

// 3. Database Sync & Listen
// Tips: Gunakan '0.0.0.0' agar Cloud Run bisa akses
const port = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log("Database connected");
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("Gagal konek DB, tapi coba jalankan server...");
    // Tetap jalankan server biar Cloud Run nggak dianggap gagal/timeout
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server running on port ${port}`);
    });
  });