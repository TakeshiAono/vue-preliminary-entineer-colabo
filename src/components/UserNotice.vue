<script setup lang="ts">
const props = defineProps(["userNoticeLogs"])
</script>

<template>
  <h1 id="project-user-notice-title">お知らせ</h1>
  <div id="project-user-notice-content">
    <p class="user-notice" v-for="userNotice in props.userNoticeLogs" :key="userNotice">
      {{ userNotice }}
    </p>
  </div>
</template>

<style scoped>
#project-user-notice-title {
  text-decoration: underline;
}

#project-user-notice-content {
  width: 200px;
  height: 90%;
  border-radius: 10px;
  border: solid;
}

.user-notice {
  margin: 5px;
}
</style>
