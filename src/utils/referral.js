import crypto from "crypto";

export function generateReferralId(length = 8) {
  return crypto
    .randomBytes(length)
    .toString("base64")
    .replace(/[+/=]/g, "")
    .substring(0, length)
    .toUpperCase();
}
