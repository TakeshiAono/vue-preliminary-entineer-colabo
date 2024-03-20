<script setup lang="ts">
import ProjectSummary from '@/components/ProjectSummary.vue';
import router from '@/router';
import { useProjectStore } from '@/stores/projectStore';
import { useUserStore } from '@/stores/userStore';
import axios from 'axios';
import { computed, ref } from 'vue';
import { RouterView } from 'vue-router';

const projectStore = useProjectStore()
</script>

<template>
  <main>
    <ProjectSummary :projects="projectStore.belongsProjects" v-if="projectStore.belongsProjects.length > 0" />
  </main>
</template>

<style scoped>
p {
  background-color: red;
}

header {
  background-color: blue;
}

footer {
  background-color: yellow;
}
</style>
