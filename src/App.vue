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
      <n-dialog-provider>
        <div class="wrapper">
          <NavigationBar :isLogin="isLogin" />
        </div>
      
        <RouterView />
      </n-dialog-provider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style scoped></style>
