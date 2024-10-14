<script setup lang="ts">
import { useTaskStore } from "@/stores/taskStore"
import { onMounted, ref, watch } from "vue"
import DashboardDeadline from "./DashboardDeadline.vue"
import TaskGraph from "./TaskGraph.vue"
import TaskSummary from "./TaskSummary.vue"

const props = defineProps<{
  tasks: Task[]
  projects: Project[]
  selectedProjectId: number
}>()
const taskStore = useTaskStore()

const project = ref<Project>(
  props.projects.find((project) => project.id == props.selectedProjectId) as Project,
) // NOTE: Dashboard.vueはプロジェクトがないと表示させないため型アサーションを使用
const deadline = ref<string>(project.value.deadline ?? "")

const selectedTasks = ref<Task[] | []>([])

onMounted(() => {
  updateTasks()
})

watch(
  () => props.selectedProjectId,
  () => {
    updateTasks()
  },
)

const updateTasks = async () => {
  selectedTasks.value = await taskStore.searchTasks({
    projectId: props.selectedProjectId,
  })
  console.log("searchTasks result:", tasks) // 取得したタスクデータを確認
  selectedTasks.value = tasks
  console.log("Selected tasks to be passed:", selectedTasks.value)
}
</script>

<template>
  <h1 id="dashboard-title">ダッシュボード</h1>
  <div id="dashboard-content">
    <div id="project-deadline-info">
      <DashboardDeadline :deadline="deadline" />
    </div>
    <div id="task-summary">
      <TaskSummary v-if="tasks.length != 0" :tasks="selectedTasks" />
    </div>
    <div id="tasks-graph">
      <TaskGraph :tasks="selectedTasks" />
    </div>
  </div>
</template>

<style scoped>
#dashboard-title {
  text-decoration: underline;
}

#dashboard-content {
  display: flex;
  justify-content: space-around;
  border-radius: 10px;
  border: solid;
}

#project-deadline-info {
  margin: auto 0;
}

#tasks-graph {
  width: 60%;
}
</style>
