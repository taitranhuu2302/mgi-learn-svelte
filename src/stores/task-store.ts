import { get, writable } from "svelte/store";
import type { TaskItemStatusType, TaskItemType } from "../types/task";

export const tasks = writable<TaskItemType[]>([]);
const KEY = "TASKS";

export const getTaskFromLocal = () => {
  const localTasks = localStorage.getItem(KEY)
    ? JSON.parse(localStorage.getItem(KEY) as string)
    : [];

  tasks.set(localTasks);
};

export const setTaskToLocal = () => {
  localStorage.setItem(KEY, JSON.stringify(get(tasks)));
};

export const addTasks = (task: TaskItemType) => {
  const newTask: TaskItemType = {
    ...task,
    id: new Date().getTime().toString(),
    createdAt: new Date(),
  };

  tasks.update((t) => [newTask, ...t]);
  setTaskToLocal();
};

export const changeStatusTask = (id: string, status: TaskItemStatusType) => {
  tasks.update((t) =>
    t.map((item) => {
      if (item.id === id) {
        item.status = status;
      }
      return item;
    })
  );
  setTaskToLocal();
};

export const deleteTask = (id: string) => {
  tasks.update((t) => t.filter((item) => item.id !== id));
};

export const editTask = (task: TaskItemType) => {
  tasks.update((t) => t.map((item) => (item.id === task.id ? task : item)));
};

export const clearAll = () => {
  tasks.set([]);
  setTaskToLocal();
}
