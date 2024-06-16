<script setup lang="ts">
import router from "@/router"
import { useUserStore } from "@/stores/userStore"
import axios from "axios"
import { computed, ref } from "vue"
import { RouterView } from "vue-router"

const userStore = useUserStore()
// const data = ref(0)
</script>

<template>
  <main>
    <h1>Profile</h1>
    <p>氏名1{{ userStore.currentUser.name }}</p>
    <p>登録メールアドレス{{ userStore.currentUser.email }}</p>
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
