<script setup lang="ts">
import { RouterView } from "vue-router"
import NavigationBar from "./components/NavigationBar.vue"
import { bulkFetch } from "./utils/bulk"

bulkFetch()
</script>

<template>
  <div class="wrapper">
    <NavigationBar :isLogin="isLogin" />
  </div>

  <RouterView />
</template>

<style scoped></style>
