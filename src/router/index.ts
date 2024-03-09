import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import MyPageView from '@/views/MyPageView.vue'
import AccountView from '@/views/AccountView.vue'
import { useUserStore } from '@/stores/user'
import ProjectShow from '@/views/ProjectShow.vue'
import ChatShow from '@/views/ChatShow.vue'
import Profile from '@/views/Profile.vue'
import ProjectsSearch from '@/views/ProjectsSearch.vue'

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
      component: ProjectShow,
      props: true
    },
    {
      path: '/chat/:id',
      name: 'chatShow',
      component: ChatShow,
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
      beforeEnter: (to: any, from: any, next: (path: string) =>{}) => {
        const userStore = useUserStore()
        userStore.logout()
        next("/login");
      }
    }
  ]
})

export default router
