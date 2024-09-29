<script setup lang="ts">
import { ref, onMounted, h } from "vue"
import { NButton, NModal, NForm, NFormItem, NInput, useMessage } from "naive-ui"
import type { DataTableColumns } from "naive-ui"
import TaskSearchContainer from "@/components/TaskSearchContainer.vue"
import { useTaskStore } from "@/stores/taskStore"
import type { searchTasksParams } from "@/stores/taskStore"

const tasksStore = useTaskStore()

interface Task {
  id: number
  name: string
  description: string
  projectId: string
  inChargeUserId: string
}

const emptyTask = {
  id: 0,
  name: "",
  description: "",
  projectId: "",
  inChargeUserId: "",
}

const tasks = ref<Task[] | []>([])
const editingTask = ref<Task>(emptyTask)
const showEditTaskModal = ref(false)

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
    {
      title: "担当者ID",
      key: "inChargeUserId",
    },
    {
      title: "操作",
      key: "actions",
      render(row) {
        return h(
          NButton,
          {
            type: "info",
            size: "small",
            onClick: () => editTask(row),
          },
          { default: () => "編集" },
        )
      },
    },
  ]
}

const columns = createColumns()

const searchTasks = async (query: searchTasksParams) => {
  const response = await tasksStore.searchTasks(query)
  tasks.value = response
    .filter(({ id, projectId, inChargeUserId }) => id && projectId && inChargeUserId)
    .map((task) => ({
      id: task.id,
      name: task.name,
      description: task.description!,
      projectId: String(task.projectId!),
      inChargeUserId: String(task.inChargeUserId!),
    }))
    .sort((a, b) => b.id - a.id) // 降順
}

const editTask = (task: Task) => {
  editingTask.value = { ...task }
  showEditTaskModal.value = true
}

const updateTask = async () => {
  if (!editingTask.value.name) {
    message.error("タスク名を入力してください")
    return
  }
  if (!editingTask.value.projectId) {
    message.error("プロジェクトIDを入力してください")
    return
  }
  if (!editingTask.value.inChargeUserId) {
    message.error("担当者IDを入力してください")
    return
  }

  const id = editingTask.value.id

  const params = {
    name: editingTask.value.name,
    description: editingTask.value.description,
    projectId: parseInt(editingTask.value.projectId),
    inChargeUserId: parseInt(editingTask.value.inChargeUserId),
  }

  try {
    await tasksStore.updateTask(id, params)
    await searchTasks({})
    message.success("タスクを更新しました")

    showEditTaskModal.value = false
    editingTask.value = { ...emptyTask }
  } catch (error) {
    message.error("タスク更新に失敗しました")
  }
}

onMounted(async () => {
  searchTasks({})
})

// タスク登録モーダル関連の状態
const showTaskModal = ref(false)
const taskName = ref("")
const taskDescription = ref("")
const taskProjectId = ref("")
const taskInChargeUserId = ref("")

// メッセージ機能
const message = useMessage()

// タスク登録処理
const registerTask = async () => {
  if (taskName.value === "") {
    message.error("タスク名を入力してください")
    return
  }
  if (!taskProjectId.value) {
    message.error("プロジェクトIDを入力してください")
    return
  }
  if (!taskInChargeUserId.value) {
    message.error("担当者IDを入力してください")
    return
  }

  const params = {
    name: taskName.value,
    description: taskDescription.value,
    projectId: parseInt(taskProjectId.value),
    inChargeUserId: parseInt(taskInChargeUserId.value),
  }

  try {
    await tasksStore.createTask(params)
    await searchTasks({})
    message.success("タスクを作成しました")

    showTaskModal.value = false
    taskName.value = ""
    taskDescription.value = ""
    taskProjectId.value = ""
    taskInChargeUserId.value = ""
  } catch (error) {
    message.error("タスク作成に失敗しました")
  }
}
</script>

<template>
  <main>
    <h1>タスク一覧</h1>
    <TaskSearchContainer @searchTasks="searchTasks" />
    <n-space justify="center">
      <n-button type="info" @click="showTaskModal = true"> タスク登録 </n-button>
    </n-space>
    <n-data-table
      :columns="columns"
      :data="tasks"
      :pagination="{ pageSize: 10 }"
      :bordered="true"
    />

    <!-- タスク登録モーダル -->
    <n-modal v-model:show="showTaskModal" title="タスク登録" preset="dialog">
      <n-form>
        <n-form-item label="タスク名" required>
          <n-input v-model:value="taskName" placeholder="タスク名を入力" />
        </n-form-item>
        <n-form-item label="説明">
          <n-input
            v-model:value="taskDescription"
            type="textarea"
            placeholder="タスクの説明を入力"
          />
        </n-form-item>
        <n-form-item label="プロジェクトID" required>
          <n-input v-model:value="taskProjectId" placeholder="プロジェクトIDを入力" />
        </n-form-item>
        <n-form-item label="ユーザーID" required>
          <n-input v-model:value="taskInChargeUserId" placeholder="ユーザーIDを入力" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-button @click="showTaskModal = false">キャンセル</n-button>
        <n-button type="info" @click="registerTask">登録</n-button>
      </template>
    </n-modal>
    <n-modal v-model:show="showEditTaskModal" title="タスク編集" preset="dialog">
      <n-form>
        <n-form-item label="タスク名" required>
          <n-input v-model:value="editingTask.name" placeholder="タスク名を入力" />
        </n-form-item>
        <n-form-item label="説明">
          <n-input
            v-model:value="editingTask.description"
            type="textarea"
            placeholder="タスクの説明を入力"
          />
        </n-form-item>
        <n-form-item label="プロジェクトID" required>
          <n-input v-model:value="editingTask.projectId" placeholder="プロジェクトIDを入力" />
        </n-form-item>
        <n-form-item label="ユーザーID" required>
          <n-input v-model:value="editingTask.inChargeUserId" placeholder="ユーザーIDを入力" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-button @click="showEditTaskModal = false">キャンセル</n-button>
        <n-button type="info" @click="updateTask">更新</n-button>
      </template>
    </n-modal>
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
