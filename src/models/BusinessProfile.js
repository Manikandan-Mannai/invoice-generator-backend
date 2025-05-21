import mongoose from "mongoose";

const businessProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    driverName: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      default: "", // e.g., Sedan, Hatchback, SUV
    },
    licenseNumber: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    pinCode: {
      type: String,
      default: "",
    },
    companyLogoUrl: {
      type: String,
      default: "", // Optional: Some fleets may want branding
    },
    currency: {
      type: String,
      default: "INR",
    },
    gstNumber: {
      type: String,
      default: "",
    },
    contactEmail: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BusinessProfile", businessProfileSchema);