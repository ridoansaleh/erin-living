import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import "./custom-select.css";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`custom-select relative ${className}`}>
      <div className="label">{label}</div>
      <button
        type="button"
        className={`input flex justify-between items-center bg-white ${
          value ? "filled" : ""
        }`}
        onClick={toggleDropdown}
      >
        <span>
          {value
            ? options.find((opt) => opt.value === value)?.label
            : placeholder}
        </span>
        <Image src="/select-arrow-down.png" alt="" width={24} height={24} />
      </button>
      {isOpen && (
        <ul className="dropdown absolute bg-white z-10">
          {options.map((option) => (
            <li
              key={option.value}
              className="flex items-center"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
