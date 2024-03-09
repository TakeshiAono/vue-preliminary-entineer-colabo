import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import VueCookies from 'vue-cookies'

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(VueCookies.get("token"))

  function login() {
    isLogin.value = true
    VueCookies.set("token", true)
  }

  const getIsLogin = computed(() => isLogin.value)

  return { isLogin, login, getIsLogin }
})
