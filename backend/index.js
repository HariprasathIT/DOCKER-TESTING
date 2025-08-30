import express from "express";
import dotenv from "dotenv";
import uploadRoute from "./routes/upload.js";

dotenv.config();
const app = express();

app.use(express.json());

// ✅ Mount the route correctly
app.use("/api/upload", uploadRoute);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
