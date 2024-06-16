<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  deadline: string
}>()

const calcDeadline = (date: string) => {
  return Math.round((new Date(date).getTime() - Date.now()) / (1000 * 3600 * 24)).toString()
}

const deadline = computed(() => calcDeadline(props.deadline))
</script>

<template>
  <div id="deadline-content">
    <p>期日まで</p>
    <span>あと</span><span class="deadline">{{ deadline }}日</span>
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

.deadline {
  font-size: 2em;
}
</style>
