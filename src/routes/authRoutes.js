import express from "express";
import passport from "passport";
import BusinessProfile from "../models/BusinessProfile.js"; 

const router = express.Router();

router.get("/google", (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
});

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    console.log("✅ Google OAuth successful");

    try {
      const userId = req.user._id;

      const profile = await BusinessProfile.findOne({ userId });

      if (!profile) {
        return res.redirect("http://localhost:5173/setup-business-profile");
      }
      return res.redirect("http://localhost:5173/home");
    } catch (error) {
      console.error("Error checking BusinessProfile:", error);
      return res.redirect("http://localhost:5173/home");
    }
  }
);

export default router;
