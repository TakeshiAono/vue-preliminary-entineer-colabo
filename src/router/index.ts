import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import MyPageView from '@/views/MyPageView.vue'
import AccountView from '@/views/AccountView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView
    },
    {
      path: '/myPage',
      name: 'myPage',
      component: MyPageView
    },
    {
      path: '/logout',
      name: 'logout',
      // @ts-ignore
      beforeEnter: (to: any, from: any, next: (path: string) =>{}) => {
        const userStore = useUserStore()
        userStore.logout()
        next("/login");
      }
    }
  ]
})

export default router
