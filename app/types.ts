export type TUrgencyLevel =
  | "Emergency"
  | "Urgent"
  | "Non Urgent"
  | "Less Urgent";
export type TStatusLevel = "Resolved" | "Unresolved";

export interface IRequest {
  id: string;
  title: string;
  urgency: TUrgencyLevel;
  status: TStatusLevel;
  description?: string;
  created_at: string;
}

export interface RequestItemProps extends IRequest {
  onRefreshData: () => Promise<void>;
}
