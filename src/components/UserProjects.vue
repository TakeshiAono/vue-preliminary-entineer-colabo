<template>
  <main>
    <h2>参加プロジェクト一覧</h2>
    <ul v-if="projectIds && projectIds.length > 0">
      <li v-for="projectId in projectIds" :key="projectId">
        {{ getProjectName(projectId) }}
      </li>
    </ul>
    <p v-else>No projects found</p>
  </main>
</template>

<script setup lang="ts">
import { useProjectStore } from '@/stores/projectStore';
import { defineProps, ref } from 'vue';

defineProps<{ projectIds?: number[] }>(); // projectIds をオプショナルにする

const projectStore = useProjectStore();
const allProjectsLoaded = ref(false);

// すべてのプロジェクトデータを読み込む
projectStore.fetchAllProjects().then(() => {
  allProjectsLoaded.value = true;
});

const getProjectName = (projectId: number) => {
  const project = projectStore.getProjectById(projectId);
  return project ? project.name : 'Unknown';
};
</script>
