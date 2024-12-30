import { RequestItemProps, TUrgencyLevel, TStatusLevel } from "../types";
import "./request-item.css";

const priorityIcons = {
  Emergency: "🔥",
  Urgent: "⚡",
  "Non Urgent": "🙂",
  "Less Urgent": "🔨",
};

const getPriorityClass = (urgencyLevel: TUrgencyLevel) => {
  switch (urgencyLevel) {
    case "Emergency":
      return "emergency";
    case "Urgent":
      return "urgent";
    case "Less Urgent":
      return "less-urgent";
    case "Non Urgent":
      return "non-urgent";
    default:
      return "";
  }
};

const getStatusClass = (status: TStatusLevel) => {
  switch (status) {
    case "Resolved":
      return "resolved";
    case "Unresolved":
      return "unresolved";
    default:
      return "";
  }
};

export default function RequestItem({
  id,
  title,
  created_at,
  urgency,
  status,
  onRefreshData,
}: RequestItemProps) {
  const priorityClass = getPriorityClass(urgency);
  const statusClass = getStatusClass(status);

  const handleStatusClick = async (id: string, status: TStatusLevel) => {
    // Prevent to update the resolved task
    if (status === "Resolved") return;
    try {
      const response = await fetch("/api/maintenance", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        onRefreshData();
      } else {
        alert("Failed to update the task.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update the task.");
    }
  };

  return (
    <div className="request-item mx-auto">
      <div className="top flex justify-between">
        <span className="name">{title}</span>
        <span className="date">{created_at}</span>
      </div>
      <div className="bottom flex justify-between">
        <span className={`priority ${priorityClass}`}>
          {priorityIcons[urgency]} {urgency}
        </span>
        <span
          className={`status ${statusClass}`}
          onClick={() => handleStatusClick(id, status)}
        >
          {status === "Unresolved" ? "Mark as Resolved" : "Resolved"}
        </span>
      </div>
    </div>
  );
}
