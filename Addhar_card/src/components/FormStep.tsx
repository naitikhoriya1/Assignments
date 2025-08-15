"use client";

interface FormStepProps {
  title: string;
  children: React.ReactNode;
  active?: boolean;
  completed?: boolean;
}

export default function FormStep({
  title,
  children,
  active = false,
  completed = false,
}: FormStepProps) {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md transition-opacity duration-200 ${
        !active ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center space-x-2 mb-4">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
            completed
              ? "bg-green-500 text-white"
              : active
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {completed ? "✓" : active ? "•" : "○"}
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className={!active ? "pointer-events-none" : ""}>{children}</div>
    </div>
  );
}
