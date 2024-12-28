import React from "react";
import "./custom-input.css";

interface CustomInputProps {
  type?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
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
        className={className}
      />
    </div>
  );
};

export default CustomInput;
