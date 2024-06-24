<script setup lang="ts">
const props = defineProps(["operationLogs"])
</script>

<template>
  <h1 id="project-operation-log-title">作業履歴</h1>
  <div id="project-operation-log-content">
    <p class="operation-log" v-for="operationLog in props.operationLogs" :key="operationLog">
      {{ operationLog }}
    </p>
  </div>
</template>

<style scoped>
#project-operation-log-title {
  text-decoration: underline;
}

#project-operation-log-content {
  width: 200px;
  height: 80%;
  border-radius: 10px;
  border: solid;
}

.operation-log {
  margin: 5px;
}
</style>
