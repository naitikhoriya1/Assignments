import crypto from "crypto";

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const hashOTP = async (otp: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(otp);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Buffer.from(hash).toString("hex");
};

export const verifyOTP = async (
  inputOTP: string,
  hashedOTP: string
): Promise<boolean> => {
  const inputHash = await hashOTP(inputOTP);
  return inputHash === hashedOTP;
};

export const generateToken = (userId: string): string => {
  // In a real application, use JWT or another secure token method
  return Buffer.from(userId).toString("base64");
};

export const maskAadhaar = (aadhaar: string): string => {
  return "XXXX-XXXX-" + aadhaar.slice(-4);
};

export const maskPAN = (pan: string): string => {
  return pan.slice(0, 2) + "XXXX" + pan.slice(6);
};
