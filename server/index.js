import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Start server
app.listen(8800, () => {
  console.log("Connected");
});
