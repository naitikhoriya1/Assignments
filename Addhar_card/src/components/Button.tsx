"use client";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

export default function Button({
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  children,
  variant = "primary",
  fullWidth = false,
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";
  const variantStyles = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary:
      "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500",
  };
  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-t-2 border-b-2 border-current rounded-full animate-spin mr-2" />
          Processing...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
