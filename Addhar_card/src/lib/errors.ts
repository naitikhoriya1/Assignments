import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class APIError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400,
    public errors?: { message: string }[]
  ) {
    super(message);
    this.name = "APIError";
  }
}

export function handleError(error: unknown): APIError {
  console.error("Error:", error);

  // Handle Prisma errors
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return new APIError("This record already exists.", 409);
      case "P2025":
        return new APIError("Record not found.", 404);
      default:
        return new APIError("Database error occurred.", 500);
    }
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return new APIError(
      "Validation failed",
      400,
      error.errors.map((err) => ({ message: err.message }))
    );
  }

  // Handle known API errors
  if (error instanceof APIError) {
    return error;
  }

  // Handle unknown errors
  if (error instanceof Error) {
    return new APIError(error.message, 500);
  }

  return new APIError("An unexpected error occurred", 500);
}
