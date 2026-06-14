import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import reportRoutes from "./routes/reportRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
dotenv.config();

connectDB();
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CleanWatch API Running");
});

const PORT = process.env.PORT || 5000;
app.use("/api/upload", uploadRoutes);
app.use("/api/reports", reportRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});