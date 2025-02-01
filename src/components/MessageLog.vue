<script setup lang="ts">
const props = defineProps(["chatLogs"])
</script>

<template>
  <div id="container">
    <h2 id="project-chat-log-title">チャット履歴</h2>
    <div id="project-chat-log-content">
      <p class="chat-log" v-for="chatLog in props.chatLogs" :key="chatLog">{{ chatLog }}</p>
    </div>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#project-chat-log-title {
  text-decoration: underline;
}

#project-chat-log-content {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: solid;
  min-height: 50px;
}

.chat-log {
  margin: 5px;
}
</style>
