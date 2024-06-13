<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore()
</script>

<template>
  <h2>自己紹介</h2>
  <div>{{ userStore.currentUser.introduce }}</div>
</template>

<style scoped>

</style>