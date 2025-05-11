import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
