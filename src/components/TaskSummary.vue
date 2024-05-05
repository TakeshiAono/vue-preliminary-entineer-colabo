<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ tasks: Task[], taskId: string, user: User[] }>()
const tasksNumber = ref(0)
const incompleteTaskNumber = ref(0)

watch(() => props.tasks, () => {
  tasksNumber.value = props.tasks.length
  incompleteTaskNumber.value = props.tasks.filter(task => !task.doneAt).length
})
</script>

<template>
  <div id="task-summary-content">
    <p>❌ 残課題</p>
    {{ incompleteTaskNumber }}
    <p>✅ 完了課題</p>
    {{ (props.tasks.length - incompleteTaskNumber) }}
    <p>全体進捗率</p>
    {{ Math.round((props.tasks.length - incompleteTaskNumber) / tasksNumber * 100) }} %
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

.task-summary {
  font-size: 2em;
}
</style>
