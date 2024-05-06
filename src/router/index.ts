import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import MyPageView from '@/views/MyPageView.vue'
import AccountView from '@/views/AccountView.vue'
import { useUserStore } from '@/stores/userStore'
import Profile from '@/views/Profile.vue'
import ProjectsSearch from '@/views/ProjectsSearch.vue'
import ChatView from '@/views/ChatView.vue'
import ProjectView from '@/views/ProjectView.vue'

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
      path: '/projects/search',
      name: 'projectsSearch',
      component: ProjectsSearch
    },
    {
      path: '/project/:id',
      name: 'projectShow',
      component: ProjectView,
      props: true
    },
    {
      path: '/chat/:id',
      name: 'chatShow',
      component: ChatView,
      props: true
    },
    {
      path: '/user/:id',
      name: 'profile',
      component: Profile,
      props: true
    },
    {
      path: '/logout',
      name: 'logout',
      // @ts-ignore
      beforeEnter: (to: any, from: any, next: (path: string) => {}) => {
        const userStore = useUserStore()
        userStore.logout()
        next('/login')
      }
    }
  ]
})

export default router
