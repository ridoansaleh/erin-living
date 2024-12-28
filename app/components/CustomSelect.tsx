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
      {/* Trigger Button */}
      <button
        className={`input flex justify-between items-center text-leftx bg-white focus:outline-none ${
          value ? "filled" : ""
        }`}
        onClick={toggleDropdown}
        type="button"
      >
        <span>
          {value
            ? options.find((opt) => opt.value === value)?.label
            : placeholder}
        </span>
        <Image src="/select-arrow-down.png" alt="" width={24} height={24} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="dropdown absolute bg-white z-10">
          {options.map((option) => (
            <li
              key={option.value}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                value === option.value ? "bg-gray-100 font-bold" : ""
              }`}
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
