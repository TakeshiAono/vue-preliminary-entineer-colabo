<script setup lang="ts">
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()
</script>

<template>
  <main>
    <h1>ProjectShow</h1>
    <p>ログイン中: {{ userStore.isLogin }}</p>
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
