import { IRequest, TPriorityLevel, TStatusLevel } from "../types";
import "./request-item.css";

const priorityIcons = {
  Emergency: "🔥",
  Urgent: "⚡",
  "Non Urgent": "🙂",
  "Less Urgent": "🔨",
};

const getPriorityClass = (priorityLevel: TPriorityLevel) => {
  switch (priorityLevel) {
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
  name,
  createdAt,
  priorityLevel,
  status,
}: IRequest) {
  const priorityClass = getPriorityClass(priorityLevel);
  const statusClass = getStatusClass(status);

  return (
    <div className="request-item mx-auto">
      <div className="top flex justify-between">
        <span className="name">{name}</span>
        <span className="date">{createdAt}</span>
      </div>
      <div className="bottom flex justify-between">
        <span className={`priority ${priorityClass}`}>
          {priorityIcons[priorityLevel]} {priorityLevel}
        </span>
        <span className={`status ${statusClass}`}>
          {status === 'Unresolved' ? 'Mark as Resolved' : 'Resolved'}
        </span>
      </div>
    </div>
  );
}
