<script setup lang="ts">
import { useTaskStore } from "@/stores/taskStore"
import { onMounted, ref, watch } from "vue"
import DashboardDeadline from "./DashboardDeadline.vue"
import TaskGraph from "./TaskGraph.vue"
import TaskSummary from "./TaskSummary.vue"
import { useUserStore } from "@/stores/userStore"

const props = defineProps<{
  tasks: Task[]
  projects: Project[]
  selectedProjectId: number
}>()
const taskStore = useTaskStore()
const userStore = useUserStore()

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
    userId: userStore.currentUser.id,
    projectId: props.selectedProjectId,
  })
}
</script>

<template>
  <h1 id="dashboard-title">ダッシュボード</h1>
  <div id="dashboard-content">
    <div id="project-deadline-info">
      <DashboardDeadline :deadline="deadline" />
    </div>
    <div id="task-summary">
      <TaskSummary v-if="selectedTasks.length != 0" :tasks="selectedTasks" />
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
  justify-content: center;
  align-items: center;
  max-width: 650px;
  min-width: 900px;
  width: 100%;
  border-radius: 10px;
  border: solid;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
}

#project-deadline-info {
  margin: auto 0;
  text-align: center;
  flex: 1;
}

#tasks-graph {
  width: 100%;
  max-width: 100%;
  flex: 2;
}
</style>
