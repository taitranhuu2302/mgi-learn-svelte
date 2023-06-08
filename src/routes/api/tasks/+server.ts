import { dataTasks } from "$lib/server/task";
import type { RequestEvent } from "@sveltejs/kit";

export const GET = async () => {
  return new Response(JSON.stringify(dataTasks));
};

export const POST = async ({ request }: RequestEvent) => {
  const task = await request.json();

  dataTasks.unshift(task);

  return new Response(JSON.stringify(dataTasks));
};

