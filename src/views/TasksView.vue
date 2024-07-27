<script setup lang="ts">
import { ref, onMounted } from "vue"

import { NButton } from "naive-ui"
import type { DataTableColumns } from "naive-ui"
import TaskSearchContainer from "@/components/TaskSearchContainer.vue"
import { useTaskStore } from "@/stores/taskStore"
import type { searchTasksParams } from "@/stores/taskStore"

const tasksStore = useTaskStore()

interface Task {
  id: number
  name: string
  description: string
}

const tasks = ref<Task[] | []>([])

const createColumns = (): DataTableColumns<Task> => {
  return [
    {
      title: "ID",
      key: "id",
    },
    {
      title: "タスク名",
      key: "name",
    },
    {
      title: "説明",
      key: "description",
    },
  ]
}

const columns = createColumns()

const searchTasks = async (query: searchTasksParams) => {
  const response = await tasksStore.searchTasks(query)
  tasks.value = response.map(({ id, name, description }) => ({
    id,
    name,
    description: description ?? "",
  }))
}

onMounted(async () => {
  const response = await tasksStore.searchTasks({})
  tasks.value = response.map(({ id, name, description }) => ({
    id,
    name,
    description: description ?? "",
  }))
})
</script>

<template>
  <main>
    <h1>タスク一覧</h1>
    <TaskSearchContainer @searchTasks="searchTasks" />
    <n-space justify="center">
      <!-- TODO タスク登録モーダルを開く処理 -->
      <n-button type="info"> タスク登録 </n-button>
    </n-space>
    <n-data-table
      :columns="columns"
      :data="tasks"
      :pagination="{ pageSize: 10 }"
      :bordered="true"
    />
  </main>
</template>

<style scoped>
p {
  background-color: red;
}

header {
  background-color: blue;
}

footer {
  background-color: yellow;
}
</style>
