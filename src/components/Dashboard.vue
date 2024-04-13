<script setup lang="ts">
import ProjectDeadline from './ProjectDeadline.vue';

const {tasks, project} = defineProps(["tasks", "project"])
</script>

<template>
  <h1 id="dashboard-title">ダッシュボード</h1>
  <div id="dashboard-content">
    <div id="project-deadline-info">
      <ProjectDeadline :project="project"/>
    </div>
    <div id="task-summary">
    </div>
    <div id="tasks-graph">
    </div>
  </div>

</template>

<style scoped>
#dashboard-title {
  text-decoration: underline;
}

#dashboard-content {
  width: 200px;
  height: 100px;
  border-radius: 10px;
  border: solid;
}
</style>
