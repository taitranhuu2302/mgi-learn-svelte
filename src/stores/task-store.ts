import { BASE_URL } from "$lib/config";
import { writable } from "svelte/store";
import type { TaskItemType } from "../types/task";

export const tasks = writable<TaskItemType[]>([]);
const URL = `${BASE_URL}/api/tasks`;

export const setTasks = (taskList: TaskItemType[]) => {
  tasks.set(taskList);
};

export const addTasks = async (task: TaskItemType) => {
  const newTask: TaskItemType = {
    ...task,
    id: new Date().getTime().toString(),
    createdAt: new Date(),
  };

  const data = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(newTask),
  }).then((response) => response.json());

  tasks.set(data);
};

export const editTask = async (task: TaskItemType) => {
  const data = await fetch(`${URL}/${task.id}`, {
    method: "PATCH",
    body: JSON.stringify(task),
  }).then((res) => res.json());

  tasks.set(data);
};

export const deleteTask = (id: string) => {
  tasks.update((t) => t.filter((item) => item.id !== id));
};