<script setup lang="ts">
import router from '@/router';
import { useProjectStore } from '@/stores/projectStore';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { computed, ref } from 'vue';
import { RouterView } from 'vue-router';

const projectStore = useProjectStore()
</script>

<template>
  <main>
    <h1> {{ projectStore.belongsProjects[0].name }}</h1>
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
