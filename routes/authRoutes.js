import expres from "express";
import passport from "passport";

const router = expres.Router();

router.get("/google", (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
});

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log("✅ Google OAuth successful");
    res.redirect("http://localhost:5173/home");
  }
);

export default router;
