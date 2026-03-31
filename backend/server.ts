import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import lettersRouter from "./routes/letters";

const app = express();

app.use(cors());
app.use(express.json());

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/our-universe";
const PORT = process.env.PORT || 4000;

app.get("/", (_req, res) => {
  res.json({ message: "Our Universe backend is alive with love." });
});

app.use("/api/letters", lettersRouter);

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Our Universe backend listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

start();

