# Aadhaar Registration Portal

A Next.js application for Aadhaar and PAN verification with a modern, responsive UI and robust backend integration.

## Prerequisites

- Node.js 16.x or later
- PostgreSQL database
- pnpm, npm, or yarn

## Setup Instructions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up the database:

   - Install PostgreSQL locally or use a Docker container
   - Create a new database named 'aadhaar_portal'
   - Update the DATABASE_URL in .env if needed

3. Initialize the database:

   ```bash
   npx prisma db push
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/aadhaar_portal"
JWT_SECRET="your-secret-key-here"
```

## API Endpoints

### 1. Aadhaar Verification

- **POST** `/api/verify-aadhaar`
  - Request: `{ "aadhaarNumber": "123456789012" }`
  - Response: `{ "message": "OTP sent successfully", "maskedAadhaar": "XXXX-XXXX-9012" }`

### 2. OTP Verification

- **POST** `/api/verify-otp`
  - Request: `{ "aadhaarNumber": "123456789012", "otp": "123456" }`
  - Response: `{ "message": "OTP verified successfully", "status": "OTP_VERIFIED" }`

### 3. PAN Verification

- **POST** `/api/verify-pan`
  - Request: `{ "aadhaarNumber": "123456789012", "panNumber": "ABCDE1234F" }`
  - Response: `{ "message": "PAN verified successfully", "status": "COMPLETED" }`

## Features

1. **Frontend**:

   - Responsive design using Tailwind CSS
   - Multi-step form with progress indicators
   - Real-time validation
   - Error handling and loading states
   - OTP input with auto-focus and paste support

2. **Backend**:

   - Next.js API routes
   - PostgreSQL database with Prisma ORM
   - Data validation using Zod
   - Error handling and logging
   - Session management

3. **Security**:
   - Input validation and sanitization
   - Rate limiting (TODO)
   - Data masking
   - Secure OTP handling

## Database Schema

The application uses a PostgreSQL database with the following schema:

```prisma
model User {
  id         String   @id @default(cuid())
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  aadhaarNo  String   @unique
  panNo      String?  @unique
  verified   Boolean  @default(false)
  status     Status   @default(PENDING)
  otpAttempts Int     @default(0)
}

enum Status {
  PENDING
  AADHAAR_VERIFIED
  OTP_VERIFIED
  PAN_VERIFIED
  COMPLETED
}
```

## Development

To work on this project:

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up the database
4. Create and configure `.env`
5. Start development server: `npm run dev`
6. Visit `http://localhost:3000`

## Deployment

This application can be deployed to platforms like Vercel:

```bash
npm run build
npm start
```

Make sure to configure the production database URL in your deployment environment.
