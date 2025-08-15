import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { aadhaarSchema } from "@/lib/validations";
import { generateOTP, hashOTP, maskAadhaar } from "@/lib/utils";
import { handleError, APIError } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = aadhaarSchema.parse(body);

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { aadhaarNo: validatedData.aadhaarNumber },
    });

    // Generate OTP
    const otp = generateOTP();
    const hashedOTP = await hashOTP(otp);

    if (!user) {
      // Create new user if doesn't exist
      user = await prisma.user.create({
        data: {
          aadhaarNo: validatedData.aadhaarNumber,
          status: "PENDING",
        },
      });
    } else if (user.status === "COMPLETED") {
      throw new APIError(
        "Aadhaar number already verified and registration completed",
        400
      );
    } else {
      // Update existing user
      await prisma.user.update({
        where: { id: user.id },
        data: {
          otpAttempts: { increment: 1 },
          status: "PENDING",
        },
      });
    }

    // Store hashed OTP in session or cache (in a real application)
    // For demo purposes, we're returning the OTP directly
    // In production, send OTP via SMS/email
    console.log(`OTP for ${maskAadhaar(validatedData.aadhaarNumber)}: ${otp}`);

    return NextResponse.json(
      {
        message: "OTP sent successfully",
        otp, // Remove in production
        maskedAadhaar: maskAadhaar(validatedData.aadhaarNumber),
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
