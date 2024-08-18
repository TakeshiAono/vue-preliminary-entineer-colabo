<template>
  <h2>自己紹介</h2>
  <div id="self-introduction">
    <p>{{ user?.introduce }}</p>
  </div>
</template>

<script setup lang="ts">
import { User } from "@/types" // ユーザー型のインポート

// userプロパティの型定義
defineProps<{ user: User | null }>()
</script>

<style scoped>
#self-introduction {
  width: 200px;
  height: auto;
  border-radius: 10px;
  border: solid;
}

p {
  padding-left: 20px;
}
</style>
