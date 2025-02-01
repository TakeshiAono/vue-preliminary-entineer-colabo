<script setup lang="ts">
const props = defineProps(["operationLogs"])
</script>

<template>
  <div id="container">
    <h2 id="project-operation-log-title">作業履歴</h2>
    <div id="project-operation-log-content">
      <p class="operation-log" v-for="operationLog in props.operationLogs" :key="operationLog">
        {{ operationLog }}
      </p>
    </div>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#project-operation-log-title {
  text-decoration: underline;
}

#project-operation-log-content {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: solid;
}

.operation-log {
  margin: 5px;
}
</style>
