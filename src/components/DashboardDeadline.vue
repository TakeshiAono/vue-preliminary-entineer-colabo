<script setup lang="ts">
const {project} = defineProps(["project"])
</script>

<template>
  <div id="deadline-content">
    <p>完成予定日まで</p>
    <span>あと</span><span class="deadline">{{ Math.round((new Date(project.deadline).getTime() - Date.now()) / (1000 * 3600 * 24)) }}日</span>
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

.deadline{
  font-size: 2em;
}
</style>
