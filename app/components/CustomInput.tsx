import React from "react";
import "./custom-input.css";

interface CustomInputProps {
  type?: string; // Input type (default: "text")
  label: string;
  value: string; // Current input value
  onChange: (value: string) => void; // Callback for value change
  placeholder?: string; // Placeholder text
  disabled?: boolean; // Disable input
  className?: string; // Additional classes for styling
  name?: string; // Input name
}

const CustomInput: React.FC<CustomInputProps> = ({
  type = "text",
  label,
  value,
  onChange,
  placeholder = "",
  disabled = false,
  className = "",
  name,
}) => {
  return (
    <div className="custom-input">
      <div className="label">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        className={`border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    </div>
  );
};

export default CustomInput;
