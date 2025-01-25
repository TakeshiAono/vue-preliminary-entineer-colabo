<script setup lang="ts">
import { useUserStore } from "@/stores/userStore"
import { RouterLink } from "vue-router"

const userStore = useUserStore()
</script>

<template>
  <main>
    <header>
      <nav>
        <div class="wrapper" v-if="userStore.isLoggedIn">
          <RouterLink to="/tasks" class="nav-content">タスク一覧</RouterLink>
          <RouterLink to="/myPage" class="nav-content">MyPage</RouterLink>
          <!-- 仮でパスパラメータにid1を入れている。 -->
          <RouterLink :to="`/users/${userStore.currentUser.id}`" class="nav-content"
            >Profile</RouterLink
          >
          <RouterLink to="/projects/search" class="nav-content">projectsSearch</RouterLink>
          <RouterLink
            to="/login"
            class="nav-content"
            @click.prevent="
              async () => {
                await userStore.logout()
              }
            "
          >
            Logout
          </RouterLink>
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
  /* background-color: skyblue; */
  background: linear-gradient(skyblue, white);
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
