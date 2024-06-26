<template>
  <h2>自己紹介</h2>
  <div>{{ user?.introduce }}</div>
</template>

<script setup lang="ts">
import { User } from '@/types'; // ユーザー型のインポート

// userプロパティの型定義
defineProps<{ user: User | null }>();
</script>

<style scoped></style>
