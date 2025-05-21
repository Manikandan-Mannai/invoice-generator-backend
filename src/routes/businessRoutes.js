import express from "express";
import {
  createBusinessProfile,
  getMyBusinessProfile,
} from "../controller/businessController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Protect all routes below this line
router.use(protectRoute);

router.post("/", createBusinessProfile);
router.get("/me", getMyBusinessProfile);

export default router;
