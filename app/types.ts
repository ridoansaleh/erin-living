export type TPriorityLevel =
  | "Emergency"
  | "Urgent"
  | "Non Urgent"
  | "Less Urgent";
export type TStatusLevel = "Resolved" | "Unresolved";

export interface IRequest {
  name: string;
  createdAt: string;
  priorityLevel: TPriorityLevel;
  status: TStatusLevel;
}
