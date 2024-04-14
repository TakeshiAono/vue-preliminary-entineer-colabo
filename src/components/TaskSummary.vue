<script setup lang="ts">
import { ref } from 'vue';

const {tasks, taskId} = defineProps<{tasks: Task[], taskId: string}>()
// const task = ref(tasks.find(task => task.id == taskId))
const tasksNumber = ref(tasks.length)
const incompleteTaskNumber = ref(tasks.filter(task => !task.isDone).length)
</script>

<template>
  <div id="task-summary-content">
    <p>残課題</p>
    {{ incompleteTaskNumber }}
    <p>完了課題</p>
    {{ (tasks.length - incompleteTaskNumber) }}
    <p>全体進捗率</p>
    {{ Math.round((tasks.length - incompleteTaskNumber) / tasksNumber * 100) }} %
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

.task-summary{
  font-size: 2em;
}
</style>
