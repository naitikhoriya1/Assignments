import { z } from "zod";

export const aadhaarSchema = z.object({
  aadhaarNumber: z
    .string()
    .length(12, "Aadhaar number must be exactly 12 digits")
    .regex(/^\d+$/, "Aadhaar number must contain only digits"),
});

export const otpSchema = z.object({
  aadhaarNumber: z.string(),
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
});

export const panSchema = z.object({
  aadhaarNumber: z.string(),
  panNumber: z
    .string()
    .length(10, "PAN must be exactly 10 characters")
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN format"),
});
