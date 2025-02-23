import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import noteRoutes from "./routes/note.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../app/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed."));
    }
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/note", noteRoutes);

app.listen(8800, () => {
  console.log("Connected");
});
