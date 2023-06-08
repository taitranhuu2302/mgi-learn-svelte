import type { TaskItemType } from "../../types/task";

export const dataTasks: TaskItemType[] = [];

const BASE_URL = `http://localhost:5173/api/tasks`;

export const getAllTask = async () => {
  return await fetch(BASE_URL).then((res) => res.json());
};
