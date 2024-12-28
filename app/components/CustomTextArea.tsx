import React, { TextareaHTMLAttributes, ChangeEvent } from "react";
import "./custom-textarea.css";

interface CustomTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  value,
  onChange,
  label,
  maxLength,
  ...props
}) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="custom-textarea flex flex-col">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        {...props}
      />
    </div>
  );
};

export default CustomTextarea;
