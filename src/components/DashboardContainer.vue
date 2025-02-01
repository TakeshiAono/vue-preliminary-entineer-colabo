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

const tasksNumber = ref(0)
const incompleteTaskNumber = ref(0)

watch(
  () => props.tasks,
  () => {
    tasksNumber.value = props.tasks.length
    incompleteTaskNumber.value = props.tasks.filter((task) => !task.doneAt).length
  },
  { immediate: true },
)
</script>

<template>
  <h2 id="dashboard-title">ダッシュボード</h2>
  <div id="dashboard-grid-container">
    <div id="milestone-content">
      <MilestoneSelector :projectId="props.selectedProjectId" @select="selectMilestoneHandler" />
    </div>
    <div id="project-deadline-info">
      <DashboardDeadline :deadline="deadline" />
    </div>
    <div id="incomplete-task" v-if="tasks.length != 0" :tasks="selectedTasks">
      <p>❌ 残課題</p>
      {{ incompleteTaskNumber }}
    </div>
    <div id="complete-task" v-if="tasks.length != 0" :tasks="selectedTasks">
      <p>✅ 完了課題</p>
      {{ props.tasks.length - incompleteTaskNumber }}
    </div>
    <div id="progress-ratio" v-if="tasks.length != 0" :tasks="selectedTasks">
      <p>全体進捗率</p>
      {{ Math.round(((props.tasks.length - incompleteTaskNumber) / tasksNumber) * 100) || 0 }} %
    </div>
    <div id="user-task-selector">
      <UserTaskSelector
        :users="users"
        :initUser="initUser"
        @select="selectUserHandler"
        :projectId="props.selectedProjectId"
      />
    </div>
    <div id="tasks-graph">
      <TaskGraph :tasks="selectedTasks" />
    </div>
  </div>
</template>

<style scoped>
#dashboard-grid-container {
  display: grid;
  grid-template-areas:
    "mic mic uts uts"
    "pdi ict cot prr"
    "tgr tgr tgr tgr"
    "tgr tgr tgr tgr";
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 80px 80px 1fr 1fr;
  place-items: center;
  border: solid;
  border-radius: 10px;
}

#incomplete-task {
  grid-area: ict;
}

#complete-task {
  grid-area: cot;
}

#progress-ratio {
  grid-area: prr;
}

#milestone-content {
  grid-area: mic;
}

#project-deadline-info {
  grid-area: pdi;
}

#task-summary {
  grid-area: tsu;
}

#user-task-selector {
  grid-area: uts;
}

#tasks-graph {
  grid-area: tgr;
}
</style>
