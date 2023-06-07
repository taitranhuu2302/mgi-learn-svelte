export enum TaskItemStatusType {
  PENDING,
  COMPLETED,
}

export type TaskItemType = {
  id: string;
  name: string;
  createdAt: Date;
  status: TaskItemStatusType;
};
