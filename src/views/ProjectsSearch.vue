<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { computed, ref } from 'vue';
import { RouterView } from 'vue-router';

const userStore = useUserStore()
</script>

<template>
  <main>
    <h1>ProjectsSearchPage</h1>
    <p>ログイン中: {{userStore.isLogin}}</p>
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
