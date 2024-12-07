<script setup lang="ts">
import { RouterView } from "vue-router"
import NavigationBar from "./components/NavigationBar.vue"
import { NConfigProvider, NMessageProvider } from "naive-ui"
</script>

<template>
  <NConfigProvider>
    <NMessageProvider>
      <n-dialog-provider>
        <div class="wrapper">
          <NavigationBar />
        </div>

        <RouterView />
      </n-dialog-provider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style scoped></style>
