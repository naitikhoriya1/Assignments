import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { panSchema } from "@/lib/validations";
import { maskPAN, maskAadhaar } from "@/lib/utils";
import { handleError, APIError } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = panSchema.parse(body);

    // Find user by Aadhaar number
    const user = await prisma.user.findUnique({
      where: { aadhaarNo: validatedData.aadhaarNumber },
    });

    if (!user) {
      throw new APIError(
        "User not found. Please complete Aadhaar verification first.",
        404
      );
    }

    if (user.status !== "OTP_VERIFIED") {
      throw new APIError("Please complete OTP verification first.", 400);
    }

    // Check if PAN is already registered
    const existingPAN = await prisma.user.findUnique({
      where: { panNo: validatedData.panNumber },
    });

    if (existingPAN && existingPAN.id !== user.id) {
      throw new APIError(
        "PAN number already registered with another account.",
        400
      );
    }

    // Update user with PAN and mark as completed
    await prisma.user.update({
      where: { id: user.id },
      data: {
        panNo: validatedData.panNumber,
        status: "COMPLETED",
        verified: true,
      },
    });

    return NextResponse.json(
      {
        message: "PAN verified successfully",
        maskedPAN: maskPAN(validatedData.panNumber),
        maskedAadhaar: maskAadhaar(user.aadhaarNo),
        status: "COMPLETED",
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
