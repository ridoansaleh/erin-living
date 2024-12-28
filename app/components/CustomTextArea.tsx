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
    <div className="custom-textarea">
      <div className="label">
        {label}
      </div>
      <textarea
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        {...props}
      />
    </div>
  );
};

export default CustomTextarea;
