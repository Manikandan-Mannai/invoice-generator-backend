import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    referralId: {
      type: String,
      unique: true,
      required: true,
    },
    referredBy: {
      type: String,
      default: null,
    },
    hasRewardedReferrer: {
      type: Boolean,
      default: false,
    },
    freeTrialEndsAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
    },
    subscriptionStatus: {
      type: String,
      enum: ["free", "trial", "paid"],
      default: "trial",
    },
    subscriptionPlan: {
      type: String,
      enum: ["weekly", "monthly", "yearly"],
      default: "weekly",
    },
    paidSubscriptionEndsAt: {
      type: Date,
      default: null,
    },
    referralRewards: [
      {
        referredUserId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rewardedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ], 
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
