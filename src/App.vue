<script setup lang="ts">
import { RouterView } from "vue-router"
import NavigationBar from "./components/NavigationBar.vue"
import { bulkFetch } from "./utils/bulk"
import { NConfigProvider, NMessageProvider } from "naive-ui"

bulkFetch()
</script>

<template>
  <NConfigProvider>
    <NMessageProvider>
      <div class="wrapper">
        <NavigationBar :isLogin="isLogin" />
      </div>

      <RouterView />
    </NMessageProvider>
  </NConfigProvider>
</template>

<style scoped></style>
