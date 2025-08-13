const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chill-movie-react-meir.vercel.app",
    ],
  })
);

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/movies", require("./routes/movieRoutes"));

// Health check route
app.get("/", (req, res) => {
  res.send({ status: "OK", message: "Server is running" });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: "error", message: "Internal server error" });
});

// Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
