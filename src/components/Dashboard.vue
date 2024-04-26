<script setup lang="ts">
import { ref } from 'vue';
import DashboardDeadline from './DashboardDeadline.vue';
import TaskSummary from './TaskSummary.vue';
import TaskGraph from './TaskGraph.vue';
import type { useUserStore } from '@/stores/userStore';

const {tasks, projects, targetProjectId, users} = defineProps<{tasks: Task[], projects: Project[], targetProjectId: string, users: User[]}>()
const project = ref<Project | undefined>(projects.find(project => project.id == targetProjectId))

</script>

<template>
  <h1 id="dashboard-title">ダッシュボード</h1>
  <div id="dashboard-content">
    <div id="project-deadline-info">
      <DashboardDeadline :project="project"/>
    </div>
    <div id="task-summary">
      <TaskSummary v-if="tasks.length != 0" :tasks="tasks" :task-id="'1'"/>
    </div>
    <div id="tasks-graph">
      <TaskGraph :users="users" :tasks="tasks"/>
      {{ console.log("asdewq",tasks) }}
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
  /* margin: auto 0; */
  width: 60%;
}
</style>
