<script setup lang="ts">
import { computed } from 'vue';
import ProjectDescription from './ProjectDescription.vue';
const props = defineProps(["memberNames"])
</script>

<template>
  <p v-for="name in props.memberNames" :key="name">{{ name }}</p>
</template>

<style scoped>
#project-name {
  text-decoration: underline;
}

nav {
  /* background-color: skyblue; */
  background: linear-gradient(skyblue, white);
  height: 2.5rem;
}

.wrapper {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: auto;
  height: 100%;
  gap: 0 3%;
  margin-right: 10px;
  font-size: 1.2em;
  text-decoration: none;
}

.nav-content {
  text-decoration: none;
  color: black;
}
</style>
