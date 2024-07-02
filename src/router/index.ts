import { useUserStore } from "@/stores/userStore"
import AccountView from "@/views/AccountView.vue"
import ChatView from "@/views/ChatView.vue"
import LoginView from "@/views/LoginView.vue"
import MyPageView from "@/views/MyPageView.vue"
import ProfileView from "@/views/ProfileView.vue"
import ProjectView from "@/views/ProjectView.vue"
import ProjectsSearch from "@/views/ProjectsSearch.vue"
import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/account",
      name: "account",
      component: AccountView,
    },
    {
      path: "/myPage",
      name: "myPage",
      component: MyPageView,
    },
    {
      path: "/projects/search",
      name: "projectsSearch",
      component: ProjectsSearch,
    },
    {
      path: "/projects/:id",
      name: "projectShow",
      component: ProjectView,
      props: true,
    },
    {
      path: "/chat/:id",
      name: "chatShow",
      component: ChatView,
      props: true,
    },
    {
      path: "/users/:id",
      name: "profile",
      component: ProfileView,
      props: true,
    },
    {
      path: "/logout",
      name: "logout",
      // @ts-ignore
      beforeEnter: (to: any, from: any, next: (path: string) => {}) => {
        const userStore = useUserStore()
        userStore.logout()
        next("/login")
      },
    },
  ],
})

export default router
