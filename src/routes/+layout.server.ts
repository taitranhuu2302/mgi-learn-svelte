import { getAllTask } from "$lib/server/task";

export const load = async () => {
  return {
    tasks: await getAllTask(),
  };
};
