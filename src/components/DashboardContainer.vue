<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import DashboardDeadline from "./DashboardDeadline.vue"
import TaskSummary from "./TaskSummary.vue"
import TaskGraph from "./TaskGraph.vue"
import { useUserStore } from "@/stores/userStore"
import UserTaskSelector from "./UserTaskSelector.vue"
import MilestoneSelector from "./MilestoneSelector.vue"
import { useTaskStore } from "@/stores/taskStore"

const props = defineProps<{
  tasks: Task[]
  projects: Project[]
  selectedProjectId: number
  users: User[]
}>()
const userStore = useUserStore()
const taskStore = useTaskStore()

const project = ref<Project>(
  props.projects.find((project) => project.id == props.selectedProjectId) as Project,
) // NOTE: Dashboard.vueはプロジェクトがないと表示させないため型アサーションを使用
const deadline = ref<string>(project.value.deadline ?? "")

const initUser = userStore.getCurrentUser()
const selectedUser = ref<User>(props.users[0])
const selectedTasks = ref<Task[] | []>([])
const selectedMilestone = ref<Milestone | undefined>(undefined)

onMounted(() => {
  updateTasks()
})

watch(
  [() => selectedUser.value, () => props.selectedProjectId, () => selectedMilestone.value],
  () => {
    updateTasks()
  },
)

const selectUserHandler = (selectedUserId: number) => {
  selectedUser.value = props.users.find((user) => user.id == selectedUserId) as User
}

const selectMilestoneHandler = (milestone: Milestone | undefined) => {
  // milestone未指定の場合はプロジェクト全体の情報を表示する
  selectedMilestone.value = milestone
  deadline.value = milestone?.deadline || project.value.deadline || ""
}

const updateTasks = async () => {
  selectedTasks.value = await taskStore.searchTasks({
    projectId: props.selectedProjectId,
    userId: selectedUser.value.id,
    milestoneId: selectedMilestone.value?.id,
  })
}
</script>

<template>
  <h1 id="dashboard-title">ダッシュボード</h1>
  <div id="milestone-content">
    <MilestoneSelector :projectId="props.selectedProjectId" @select="selectMilestoneHandler" />
  </div>
  <div id="dashboard-content">
    <div id="project-deadline-info">
      <DashboardDeadline :deadline="deadline" />
    </div>
    <div id="task-summary">
      <TaskSummary v-if="tasks.length != 0" :tasks="selectedTasks" />
    </div>
    <div id="tasks-graph">
      <UserTaskSelector
        :users="users"
        :initUser="initUser"
        @select="selectUserHandler"
        :projectId="props.selectedProjectId"
      />
      <TaskGraph :user="selectedUser" :tasks="selectedTasks" />
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
