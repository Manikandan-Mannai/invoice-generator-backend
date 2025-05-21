import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import passport from "passport";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import businessRoutes from "./routes/businessRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { protectRoute } from "./middleware/protectRoute.js"; // import protectRoute
import "./config/passport.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
// Protect user and business routes with protectRoute middleware
app.use("/api/users", protectRoute, userRoutes);
app.use("/api/business", protectRoute, businessRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
  });
