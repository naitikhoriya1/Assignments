"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import FormStep from "@/components/FormStep";
import OTPInput from "@/components/OTPInput";
import {
  validateAadhaar,
  validatePAN,
  formatAadhaar,
  formatPAN,
} from "@/utils/validation";

type Step = "aadhaar" | "otp" | "pan";
type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormState {
  aadhaar: string;
  otp: string;
  pan: string;
  maskedAadhaar?: string;
  maskedPAN?: string;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("aadhaar");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    aadhaar: "",
    otp: "",
    pan: "",
  });
  const [errors, setErrors] = useState({
    aadhaar: "",
    otp: "",
    pan: "",
  });

  const handleAadhaarChange = (value: string) => {
    const formattedValue = value.replace(/\D/g, "").slice(0, 12);
    setFormData((prev) => ({ ...prev, aadhaar: formattedValue }));
    if (formattedValue && !validateAadhaar(formattedValue)) {
      setErrors((prev) => ({
        ...prev,
        aadhaar: "Please enter a valid 12-digit Aadhaar number",
      }));
    } else {
      setErrors((prev) => ({ ...prev, aadhaar: "" }));
    }
  };

  const handlePANChange = (value: string) => {
    const formattedValue = formatPAN(value).slice(0, 10);
    setFormData((prev) => ({ ...prev, pan: formattedValue }));
    if (formattedValue && !validatePAN(formattedValue)) {
      setErrors((prev) => ({
        ...prev,
        pan: "Please enter a valid PAN number (e.g., ABCDE1234F)",
      }));
    } else {
      setErrors((prev) => ({ ...prev, pan: "" }));
    }
  };

  const handleAadhaarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAadhaar(formData.aadhaar)) return;

    setLoading(true);
    try {
      const response = await fetch("/api/verify-aadhaar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadhaarNumber: formData.aadhaar }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setCurrentStep("otp");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        aadhaar: error instanceof Error ? error.message : "Verification failed",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.otp.length !== 6) {
      setErrors((prev) => ({
        ...prev,
        otp: "Please enter a valid 6-digit OTP",
      }));
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aadhaarNumber: formData.aadhaar,
          otp: formData.otp,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      // If OTP verification is successful, move to PAN step
      setCurrentStep("pan");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        otp: error instanceof Error ? error.message : "OTP verification failed",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handlePANSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePAN(formData.pan)) return;

    setLoading(true);
    try {
      const response = await fetch("/api/verify-pan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aadhaarNumber: formData.aadhaar,
          panNumber: formData.pan,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      // Handle successful verification
      alert("Verification completed successfully!");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        pan: error instanceof Error ? error.message : "Verification failed",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Aadhaar Registration Portal
        </h1>

        <FormStep
          title="Aadhaar Verification"
          active={currentStep === "aadhaar"}
          completed={currentStep === "otp" || currentStep === "pan"}
        >
          <form onSubmit={handleAadhaarSubmit} className="space-y-4">
            <FormInput
              id="aadhaar"
              label="Aadhaar Number"
              value={formData.aadhaar}
              onChange={handleAadhaarChange}
              placeholder="Enter 12 digit Aadhaar number"
              error={errors.aadhaar}
              maxLength={12}
              pattern="\d*"
              autoComplete="off"
              disabled={currentStep !== "aadhaar"}
            />
            <Button
              type="submit"
              loading={loading}
              disabled={
                !validateAadhaar(formData.aadhaar) || currentStep !== "aadhaar"
              }
              fullWidth
            >
              Get OTP
            </Button>
          </form>
        </FormStep>

        <FormStep
          title="OTP Verification"
          active={currentStep === "otp"}
          completed={currentStep === "pan"}
        >
          <form onSubmit={handleOTPSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <OTPInput
                value={formData.otp}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, otp: value }))
                }
                disabled={currentStep !== "otp"}
              />
              {errors.otp && (
                <p className="text-sm text-red-600">{errors.otp}</p>
              )}
            </div>
            <Button
              type="submit"
              loading={loading}
              disabled={formData.otp.length !== 6 || currentStep !== "otp"}
              fullWidth
            >
              Verify OTP
            </Button>
          </form>
        </FormStep>

        <FormStep
          title="PAN Verification"
          active={currentStep === "pan"}
          completed={false}
        >
          <form onSubmit={handlePANSubmit} className="space-y-4">
            <FormInput
              id="pan"
              label="PAN Number"
              value={formData.pan}
              onChange={handlePANChange}
              placeholder="Enter PAN number"
              error={errors.pan}
              maxLength={10}
              autoComplete="off"
              disabled={currentStep !== "pan"}
            />
            <Button
              type="submit"
              loading={loading}
              disabled={!validatePAN(formData.pan) || currentStep !== "pan"}
              fullWidth
            >
              Verify PAN
            </Button>
          </form>
        </FormStep>
      </div>
    </main>
  );
}
