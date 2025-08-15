import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { otpSchema } from "@/lib/validations";
import { verifyOTP, maskAadhaar } from "@/lib/utils";
import { handleError, APIError } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = otpSchema.parse(body);

    // Find user by Aadhaar number
    const user = await prisma.user.findUnique({
      where: { aadhaarNo: validatedData.aadhaarNumber },
    });

    if (!user) {
      throw new APIError("User not found", 404);
    }

    if (user.status === "COMPLETED") {
      throw new APIError("User already completed verification", 400);
    }

    // In a real application, verify OTP against stored hash
    // For demo purposes, we're accepting any 6-digit OTP
    const isValidOTP = validatedData.otp.length === 6;

    if (!isValidOTP) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          otpAttempts: { increment: 1 },
        },
      });

      throw new APIError("Invalid OTP", 400);
    }

    // Update user status
    await prisma.user.update({
      where: { id: user.id },
      data: {
        status: "OTP_VERIFIED",
      },
    });

    return NextResponse.json(
      {
        message: "OTP verified successfully",
        maskedAadhaar: maskAadhaar(user.aadhaarNo),
        status: "OTP_VERIFIED",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const apiError = handleError(error);
    return NextResponse.json(
      { error: apiError.message, errors: apiError.errors },
      { status: apiError.statusCode }
    );
  }
}
