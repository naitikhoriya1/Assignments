"use client";

import { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>("aadhaar");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState<FormState>(() => {
    // Try to load saved form data from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("formData");
      return saved ? JSON.parse(saved) : { aadhaar: "", otp: "", pan: "" };
    }
    return { aadhaar: "", otp: "", pan: "" };
  });

  const [errors, setErrors] = useState({
    aadhaar: "",
    otp: "",
    pan: "",
    general: "",
  });

  // Save form data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // Clear form data when verification is complete
  useEffect(() => {
    if (status === "success") {
      localStorage.removeItem("formData");
    }
  }, [status]);

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

    setStatus("submitting");
    setErrors((prev) => ({ ...prev, general: "", aadhaar: "" }));

    try {
      const response = await fetch("/api/verify-aadhaar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadhaarNumber: formData.aadhaar }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Verification failed");
      }

      setFormData((prev) => ({
        ...prev,
        maskedAadhaar: data.maskedAadhaar,
      }));

      setCurrentStep("otp");
      setStatus("idle");
    } catch (error) {
      setStatus("error");
      setErrors((prev) => ({
        ...prev,
        aadhaar: error instanceof Error ? error.message : "Verification failed",
        general: "An error occurred during verification",
      }));
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

    setStatus("submitting");
    setErrors((prev) => ({ ...prev, general: "", otp: "" }));

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

      if (!response.ok) {
        throw new Error(data.error || "OTP verification failed");
      }

      setCurrentStep("pan");
      setStatus("idle");
    } catch (error) {
      setStatus("error");
      setErrors((prev) => ({
        ...prev,
        otp: error instanceof Error ? error.message : "OTP verification failed",
        general: "An error occurred during OTP verification",
      }));
    }
  };

  const handlePANSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePAN(formData.pan)) return;

    setStatus("submitting");
    setErrors((prev) => ({ ...prev, general: "", pan: "" }));

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

      if (!response.ok) {
        throw new Error(data.error || "PAN verification failed");
      }

      setFormData((prev) => ({
        ...prev,
        maskedPAN: data.maskedPAN,
      }));

      setStatus("success");

      // Show success message and redirect after a delay
      setTimeout(() => {
        router.push("/success");
      }, 2000);
    } catch (error) {
      setStatus("error");
      setErrors((prev) => ({
        ...prev,
        pan: error instanceof Error ? error.message : "PAN verification failed",
        general: "An error occurred during PAN verification",
      }));
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Aadhaar Registration Portal
        </h1>

        {errors.general && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {errors.general}
          </div>
        )}

        {status === "success" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            Verification completed successfully! Redirecting...
          </div>
        )}

        <div className="mb-8">
          <div className="flex justify-between items-center">
            {["aadhaar", "otp", "pan"].map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${
                  index < ["aadhaar", "otp", "pan"].indexOf(currentStep)
                    ? "text-green-600"
                    : index === ["aadhaar", "otp", "pan"].indexOf(currentStep)
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 ${
                    index < ["aadhaar", "otp", "pan"].indexOf(currentStep)
                      ? "border-green-600 bg-green-50"
                      : index === ["aadhaar", "otp", "pan"].indexOf(currentStep)
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  {index + 1}
                </div>
                {index < 2 && (
                  <div
                    className={`w-full h-1 mx-2 ${
                      index < ["aadhaar", "otp", "pan"].indexOf(currentStep)
                        ? "bg-green-600"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

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
              disabled={currentStep !== "aadhaar" || status === "submitting"}
            />
            {formData.maskedAadhaar && (
              <p className="text-sm text-gray-600">
                Verifying: {formData.maskedAadhaar}
              </p>
            )}
            <Button
              type="submit"
              loading={status === "submitting"}
              disabled={
                !validateAadhaar(formData.aadhaar) ||
                currentStep !== "aadhaar" ||
                status === "submitting"
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
                disabled={currentStep !== "otp" || status === "submitting"}
              />
              {errors.otp && (
                <p className="text-sm text-red-600">{errors.otp}</p>
              )}
            </div>
            <Button
              type="submit"
              loading={status === "submitting"}
              disabled={
                formData.otp.length !== 6 ||
                currentStep !== "otp" ||
                status === "submitting"
              }
              fullWidth
            >
              Verify OTP
            </Button>
          </form>
        </FormStep>

        <FormStep
          title="PAN Verification"
          active={currentStep === "pan"}
          completed={status === "success"}
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
              disabled={currentStep !== "pan" || status === "submitting"}
            />
            {formData.maskedPAN && (
              <p className="text-sm text-gray-600">
                Verifying: {formData.maskedPAN}
              </p>
            )}
            <Button
              type="submit"
              loading={status === "submitting"}
              disabled={
                !validatePAN(formData.pan) ||
                currentStep !== "pan" ||
                status === "submitting"
              }
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
