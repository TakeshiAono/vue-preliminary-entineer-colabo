<script setup lang="ts">
const props = defineProps(["chatLogs"])
</script>

<template>
  <h1 id="project-chat-log-title">チャット履歴</h1>
  <div id="project-chat-log-content">
    <p class="chat-log" v-for="chatLog in props.chatLogs" :key="chatLog">{{ chatLog }}</p>
  </div>

</template>

<style scoped>
#project-chat-log-title {
  text-decoration: underline;
}

#project-chat-log-content {
  width: 200px;
  height: 80%;
  border-radius: 10px;
  border: solid;
}

.chat-log{
  margin: 5px;
}
</style>
