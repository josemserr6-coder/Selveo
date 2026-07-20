import crypto from "crypto";

export const SESSION_COOKIE = "selveo_admin_session";

function getSecret() {
  return process.env.SESSION_SECRET || "selveo-fallback-secret";
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "selveo2026";
}

export function checkPassword(candidate) {
  return typeof candidate === "string" && candidate.length > 0 && candidate === getAdminPassword();
}

export function makeSessionToken() {
  return crypto.createHmac("sha256", getSecret()).update(getAdminPassword()).digest("hex");
}

export function isValidSessionToken(token) {
  if (!token) return false;
  const expected = makeSessionToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
