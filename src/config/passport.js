import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/User.js";
import { generateReferralId } from "../utils/referral.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email)
          return done(new Error("No email id found on Google profile"));

        let user = await User.findOne({ email });
        if (!user) {
          user = new User({
            name: profile.displayName,
            email,
            referralId: generateReferralId(),
            isAdmin: false,
            isPaid: false,
            hasRewardedReferrer: false,
            subscriptionStatus: "trial",
            subscriptionPlan: "weekly",
            freeTrialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            paidSubscriptionEndsAt: null,
            referralRewards: [],
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
