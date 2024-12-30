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
  const [urgency, setUrgency] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleBackClick = () => {
    router.push("/");
  };

  const handleUrgencyChange = (value: string) => {
    setUrgency(value);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
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

  const validateForm = (): boolean => {
    return Boolean(urgency && title.length >= 10);
  };

  const isFormValid = validateForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    try {
      const response = await fetch("/api/maintenance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, urgency, status, description }),
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
            value={urgency}
            onChange={handleUrgencyChange}
            placeholder="Select Urgency"
            className="mb-16"
          />
          <CustomSelect
            label="Status"
            options={options}
            value={status}
            onChange={handleStatusChange}
            placeholder="Select Status"
            className="mb-16"
          />
          <CustomInput
            label="Title *"
            value={title}
            onChange={handleTitleChange}
            placeholder="eg. Crack in plasterboard"
            className="mb-16"
          />
          <CustomTextarea
            value={description}
            onChange={handleDescriptionChange}
            label="Description"
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
