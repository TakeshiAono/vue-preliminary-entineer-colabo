<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { computed, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

// const isLogin = ref(false)
// const props = defineProps(["isLogin"])
const userStore = useUserStore()

console.log("すとあの変化", computed(() => userStore.getIsLogin))

</script>

<template>
  <main>
      <header>
        <nav>
          <div class="wrapper" v-if="userStore.isLogin">
            <RouterLink to="/myPage" class="nav-content">MyPage</RouterLink>
            <RouterLink to="/logout" class="nav-content">Logout</RouterLink>
          </div>
          <div class="wrapper" v-else>
            <RouterLink to="/account" class="nav-content">Account</RouterLink>
            <RouterLink to="/login" class="nav-content">Login</RouterLink>
          </div>
        </nav>
    </header>
  </main>
</template>

<style scoped>
nav {
  background-color: rgb(212, 212, 212);
  height: 2.5rem;
}

.wrapper {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: auto;
  height: 100%;
  gap: 0 3%;
  margin-right: 10px;
  font-size: 1.2em;
  text-decoration: none;
}

.nav-content {
  text-decoration: none;
  color: black;
}
</style>
