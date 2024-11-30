<script setup lang="ts">
const props = defineProps(["description"])
const emits = defineEmits(["jumpProjectPage"])
</script>

<template>
  <div class="wrapper">
    <h1 id="project-description-title">概要</h1>
    <n-button round type="primary" @click="emits('jumpProjectPage')"> PJページ </n-button>
  </div>
  <div id="project-description-content">{{ props.description }}</div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row; /* 横並びに設定 */
  justify-content: space-between; /* スペースを等間隔に配置 */
  align-items: center; /* 垂直方向の中央揃え */
}

#project-name {
  text-decoration: underline;
}

#project-description-content {
  width: 200px;
  height: 100px;
  border-radius: 10px;
  border: solid;
}
</style>
