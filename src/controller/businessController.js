import BusinessProfile from "../models/BusinessProfile.js";

export const createBusinessProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const exists = await BusinessProfile.findOne({ userId });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Business profile already exists" });
    }

    const newProfile = new BusinessProfile({ ...req.body, userId });
    await newProfile.save();
    res.status(201).json({ message: "Business profile created" });
  } catch (err) {
    console.error("❌ Error creating business profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyBusinessProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const profile = await BusinessProfile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ message: "Business profile not found" });
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error("❌ Error fetching business profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};
