<script lang="ts">
  import { clickOutSide } from "$lib/click-outside";
  import { changeStatusTask, deleteTask } from "../stores/task-store";
  import { TaskItemStatusType, type TaskItemType } from "../types/task";

  export let task: TaskItemType;
  export let getEditTask: (task: TaskItemType) => void;
  let isOpenDropdown: boolean = false;

  const onChangeStatus = () => {
    const status: TaskItemStatusType =
      task.status === TaskItemStatusType.PENDING
        ? TaskItemStatusType.COMPLETED
        : TaskItemStatusType.PENDING;

    changeStatusTask(task.id, status);
  };
</script>

<li class="task-item">
  <div class="flex items-center gap-2.5 flex-grow" on:click={onChangeStatus}>
    {#if task.status === TaskItemStatusType.COMPLETED}
      <i class="far fa-check-square mt-[1px]" />
    {/if}
    {#if task.status === TaskItemStatusType.PENDING}
      <i class="far fa-square mt-[1px]" />
    {/if}
    <p
      class="text-lg {task.status === TaskItemStatusType.COMPLETED
        ? 'line-through text-gray-500'
        : ''}"
    >
      {task.name}
    </p>
  </div>
  <div class="relative" use:clickOutSide={() => (isOpenDropdown = false)}>
    <button on:click={() => (isOpenDropdown = !isOpenDropdown)}>
      <i class="far fa-ellipsis-h" />
    </button>
    {#if isOpenDropdown}
      <ul class="dropdown">
        <li
          on:click={() => {
            getEditTask(task);
            isOpenDropdown = false;
          }}
        >
          Edit
        </li>
        <li
          on:click={() => {
            deleteTask(task.id);
            isOpenDropdown = false;
          }}
        >
          Delete
        </li>
      </ul>
    {/if}
  </div>
</li>

<style lang="css">
  .task-item {
    @apply p-2.5 flex items-center gap-2.5 cursor-pointer hover:bg-gray-200 rounded;
  }

  .dropdown {
    @apply w-fit bg-white px-2 py-2.5 right-0 absolute top-full rounded shadow-md z-10;
  }

  .dropdown li {
    @apply p-2 hover:bg-gray-200 cursor-pointer;
  }
</style>
