<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps(["description"])
</script>

<template>
  <h1 id="project-description-title">概要</h1>
  <div id="project-description-content">{{ props.description }}</div>
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
