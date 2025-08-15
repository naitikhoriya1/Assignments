"use client";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  maxLength?: number;
  pattern?: string;
  disabled?: boolean;
  autoComplete?: string;
}

export default function FormInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  maxLength,
  pattern,
  disabled = false,
  autoComplete,
}: FormInputProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        } ${disabled ? "bg-gray-100" : ""}`}
        placeholder={placeholder}
        maxLength={maxLength}
        pattern={pattern}
        disabled={disabled}
        autoComplete={autoComplete}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
