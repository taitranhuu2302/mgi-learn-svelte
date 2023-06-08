<script lang="ts">
  import { onMount } from "svelte";
  import InputDefault from "../components/input-default.svelte";
  import TaskItem from "../components/task-item.svelte";
  import {
    addTasks,
    editTask,
    setTasks,
    tasks,
  } from "../stores/task-store";
  import { TaskItemStatusType, type TaskItemType } from "../types/task";
  import { derived, writable } from "svelte/store";

  enum TabActiveType {
    ALL,
    PENDING,
    COMPLETED,
  }

  enum SortType {
    ASC,
    DESC,
    DEFAULT,
  }
  export let data;

  let task: TaskItemType = {
    id: "",
    name: "",
    createdAt: new Date(),
    status: TaskItemStatusType.PENDING,
  };
  let keyword = writable<string>("");
  let tabActive = writable<TabActiveType>(TabActiveType.ALL);
  let sort = writable<SortType>(SortType.DEFAULT);

  const resetTask = () => {
    task = {
      id: "",
      name: "",
      createdAt: new Date(),
      status: TaskItemStatusType.PENDING,
    };
  };

  onMount(() => {
    setTasks(data.tasks);
  });

  const setTabActive = (tab: TabActiveType) => {
    tabActive.set(tab);
  };

  const checkActive = (tab: TabActiveType) => tab === $tabActive;

  const handleAddOrEditTask = async () => {
    if (!task.name) return;

    if (!task.id) {
      await addTasks(task);
    } else {
      await editTask(task);
    }

    resetTask();
  };

  const getEditTask = (taskEdit: TaskItemType) => {
    task = taskEdit;
  };

  const tasksFilter = derived(
    [tasks, tabActive, keyword, sort],
    ([$tasks, $tabActive, $keyword, $sort]) => {
      let result: TaskItemType[] = $tasks;

      if ($tabActive === TabActiveType.PENDING) {
        result = result.filter(
          (item) => item.status === TaskItemStatusType.PENDING
        );
      } else if ($tabActive === TabActiveType.COMPLETED) {
        result = result.filter(
          (item) => item.status === TaskItemStatusType.COMPLETED
        );
      }

      result = result.filter((item) =>
        item.name.toLowerCase().includes($keyword.toLowerCase())
      );

      if ($sort === SortType.ASC) {
        result.sort((a, b) => b.name.localeCompare(a.name));
      } else if ($sort === SortType.DESC) {
        result.sort((a, b) => a.name.localeCompare(b.name));
      }

      return result;
    }
  );

  const setSort = (type: SortType) => sort.set(type);
  const checkSort = (type: SortType) => type === $sort;
</script>

<div id="task">
  <h2 class="text-2xl font-semibold text-center mb-3">Todo List</h2>
  <div class="flex gap-2.5">
    <InputDefault
      bind:value={$keyword}
      placeholder="Search..."
      className="flex-grow"
    >
      <i slot="startIcon" class="fal fa-search text-xl" />
    </InputDefault>
    {#key $sort}
      <button
        class:active={checkSort(SortType.ASC)}
        class="btn-sort"
        on:click={() => setSort(SortType.ASC)}
      >
        <i class="fas fa-sort-alpha-up" />
      </button>
      <button
        class:active={checkSort(SortType.DESC)}
        class="btn-sort"
        on:click={() => setSort(SortType.DESC)}
      >
        <i class="fas fa-sort-alpha-down" />
      </button>
    {/key}
  </div>
  <div class="flex items-center justify-between gap-2.5 flex-wrap mt-3">
    {#key $tabActive}
      <ul class="tabs">
        <li
          class:active={checkActive(TabActiveType.ALL)}
          on:click={() => setTabActive(TabActiveType.ALL)}
        >
          All
        </li>
        <li
          class:active={checkActive(TabActiveType.PENDING)}
          on:click={() => setTabActive(TabActiveType.PENDING)}
        >
          Pending
        </li>
        <li
          class:active={checkActive(TabActiveType.COMPLETED)}
          on:click={() => setTabActive(TabActiveType.COMPLETED)}
        >
          Completed
        </li>
      </ul>
    {/key}
  </div>
  <div class="border border-gray-300 my-4" />
  <ul class="task-list">
    {#if !$tasksFilter.length}
      <li class="text-lg">You don't have any task here</li>
    {/if}
    {#each $tasksFilter as task (task.id)}
      <TaskItem {task} {getEditTask} />
    {/each}
  </ul>
  <form on:submit|preventDefault={handleAddOrEditTask}>
    <InputDefault bind:value={task.name} placeholder="Add some thing...">
      <i slot="startIcon" class="fas fa-plus-circle text-gray-500 text-2xl" />
      <svelte:fragment slot="endIcon">
        {#key task}
          <button type="submit" class="btn-form-add bg-primary-500">
            {task.id ? "Edit" : "Add"}
          </button>
          {#if task.id}
            <button on:click={resetTask} class="btn-form-add bg-red-500">
              Reset
            </button>
          {/if}
        {/key}
      </svelte:fragment>
    </InputDefault>
  </form>
</div>

<style>
  #task {
    @apply max-w-[500px] w-full rounded p-5 bg-white;
  }

  .tabs {
    @apply flex items-center gap-3;
  }

  .tabs li {
    @apply text-lg cursor-pointer;
  }

  .tabs li.active {
    @apply text-primary-500;
  }

  .task-list {
    @apply flex flex-col h-[340px] overflow-y-auto;
  }

  .btn-form-add {
    @apply px-2.5 rounded text-white;
  }

  .btn-sort {
    @apply text-xl;
  }

  .btn-sort.active i {
    @apply text-primary-500;
  }
</style>
