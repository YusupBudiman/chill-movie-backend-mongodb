const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load .env
dotenv.config();

// Connect ke MongoDB
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

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
