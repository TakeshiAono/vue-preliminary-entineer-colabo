<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import DashboardDeadline from './DashboardDeadline.vue';
import TaskSummary from './TaskSummary.vue';
import TaskGraph from './TaskGraph.vue';
import { useUserStore } from '@/stores/userStore';
import UserTaskSelector from './UserTaskSelector.vue';
import { useTaskStore } from '@/stores/taskStore';

const props = defineProps<{ tasks: Task[], projects: Project[], selectedProjectId: number, users: User[] }>()
const userStore = useUserStore()
const taskStore = useTaskStore()

const project = ref<Project>(props.projects.find(project => project.id == props.selectedProjectId) as Project) // NOTE: Dashboard.vueはプロジェクトがないと表示させないため型アサーションを使用
const initUser = userStore.getCurrentUser()
const selectedUser = ref<User>(props.users[0])
const selectedTasks = ref<Task[] | []>([])

onMounted(() => {
  updateTasks()
})

watch([() => selectedUser.value, () => props.selectedProjectId], () => {
  updateTasks()
})

const selectHandler = (selectedUserId: number) => {
  selectedUser.value = props.users.find(user => user.id == selectedUserId) as User
}

const updateTasks = () => {
  const tasksByUserMaps = createTasksByUserMaps(props.users.map(user => user.id))
  selectedTasks.value = selectTasksFromTasksByUserMaps(tasksByUserMaps, selectedUser.value)
}

const createTasksByUserMaps = (userIds: number[]): TasksByUserMap[] => {
  const tasks = userIds.map((userId) => {
    return { userId: userId, tasks: taskStore.getTasksByUserByProject(props.selectedProjectId, userId) }
  })
  return tasks
}

const selectTasksFromTasksByUserMaps = (tasksByUserMaps: TasksByUserMap[], selectUser: User): Task[] | [] => {
  const tasks = tasksByUserMaps.find(tasksByUserMap => tasksByUserMap.userId == selectUser.id)?.tasks
  return tasks || []
}
</script>

<template>
  <h1 id="dashboard-title">ダッシュボード</h1>
  <div id="dashboard-content">
    <div id="project-deadline-info">
      <DashboardDeadline :project="project" />
    </div>
    <div id="task-summary">
      <TaskSummary v-if="tasks.length != 0" :tasks="selectedTasks" />
    </div>
    <div id="tasks-graph">
      <UserTaskSelector :users="users" :initUser="initUser" @select="selectHandler" :projectId="props.selectedProjectId" />
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
