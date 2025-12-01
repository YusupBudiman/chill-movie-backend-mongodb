const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("../config/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", require("../routes/userRoutes"));
app.use("/api/movies", require("../routes/movieRoutes"));

// Health check
app.get("/", (req, res) => {
  res.send({ status: "OK", message: "Server is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: "error", message: "Internal server error" });
});

/* 
✅ INI KUNCI ANTI CRASH:
- Local → listen
- Vercel → export
*/
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`✅ Local server running on port ${PORT}`)
  );
}

module.exports = app; // ✅ untuk Vercel
