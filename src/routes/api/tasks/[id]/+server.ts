import { dataTasks } from "$lib/server/task";
import type { RequestEvent } from "@sveltejs/kit";
import type { TaskItemType } from "../../../../types/task";

export const PATCH = async ({ params, request }: RequestEvent) => {
  const { id } = params;
  const task: TaskItemType = await request.json();

  const index = dataTasks.findIndex((item) => item.id === id);

  if (index === -1) {
    return new Response("Not found", {
      status: 404,
    });
  }

  dataTasks[index] = task;

  return new Response(JSON.stringify(dataTasks));
};
