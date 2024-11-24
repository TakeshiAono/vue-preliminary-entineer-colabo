<script setup lang="ts">
const props = defineProps(["description", "width"])
</script>

<template>
  <h1 id="project-description-title">概要</h1>
  <div id="project-description-content" :style="{ width: props.width }">
    {{ props.description }}
  </div>
</template>

<style scoped>
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
