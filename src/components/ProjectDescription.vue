<script setup lang="ts">
const props = defineProps(["description"])
const emits = defineEmits(["jumpProjectPage"])
</script>

<template>
  <div id="container">
    <div class="wrapper">
      <h2 id="project-description-title">概要</h2>
      <n-button round type="primary" @click="emits('jumpProjectPage')"> PJページ </n-button>
    </div>
    <div id="project-description-content">{{ props.description }}</div>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

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
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: solid;
  min-height: 50px;
}
</style>
