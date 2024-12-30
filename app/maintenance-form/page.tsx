"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomSelect from "../components/CustomSelect";
import CustomInput from "../components/CustomInput";
import CustomTextarea from "../components/CustomTextArea";
import "./maintenance-form.css";

export default function MaintenanceForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    urgency: "",
    status: "",
    title: "",
    description: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBackClick = () => {
    router.push("/");
  };

  const urgencyOptions = [
    { value: "Emergency", label: "Emergency" },
    { value: "Urgent", label: "Urgent" },
    { value: "Non Urgent", label: "Non Urgent" },
    { value: "Less Urgent", label: "Less Urgent" },
  ];

  const options = [
    { value: "Unresolved", label: "Open" },
    { value: "Resolved", label: "Resolved" },
  ];

  const isFormValid = formData.urgency && formData.title.length >= 10;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    try {
      const response = await fetch("/api/maintenance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Task successfully added");
        router.push("/");
      } else {
        alert("Failed to create the task.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create the task.");
    }
  };

  return (
    <div className="maintenance-form-page">
      <main>
        <div className="title flex justify-center items-center">
          <Image
            src="/arrow-left.png"
            alt=""
            width={24}
            height={24}
            className="icon"
            onClick={handleBackClick}
          />
          <h1 className="label text-center">Maintenance Request</h1>
        </div>
        <form className="mx-auto" onSubmit={handleSubmit}>
          <CustomSelect
            label="Urgency *"
            options={urgencyOptions}
            value={formData.urgency}
            onChange={(value) => handleInputChange("urgency", value)}
            placeholder="Select Urgency"
            className="mb-16"
          />
          <CustomSelect
            label="Status"
            options={options}
            value={formData.status}
            onChange={(value) => handleInputChange("status", value)}
            placeholder="Select Status"
            className="mb-16"
          />
          <CustomInput
            label="Title *"
            value={formData.title}
            onChange={(value) => handleInputChange("title", value)}
            placeholder="eg. Crack in plasterboard"
            className="mb-16"
          />
          <CustomTextarea
            label="Description"
            value={formData.description}
            onChange={(value) => handleInputChange("description", value)}
            placeholder="Description of your request"
          />
          <button
            type="submit"
            disabled={!isFormValid}
            className={`submit-btn mx-auto ${
              isFormValid ? "valid" : "invalid"
            }`}
          >
            Save
          </button>
        </form>
      </main>
    </div>
  );
}
