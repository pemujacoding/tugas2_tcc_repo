const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.use(cors());
app.use(express.json());

const noteRoutes = require("./routes/noteRoutes");
app.use("/notes", noteRoutes);

sequelize.sync().then(() => {
  console.log("Database connected");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
