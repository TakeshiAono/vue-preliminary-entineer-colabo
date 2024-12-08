import { useUserStore } from "@/stores/userStore"
import AccountView from "@/views/AccountView.vue"
import ChatView from "@/views/ChatView.vue"
import LoginView from "@/views/LoginView.vue"
import MyPageView from "@/views/MyPageView.vue"
import OfferView from "@/views/OfferView.vue"
import ProfileView from "@/views/ProfileView.vue"
import ProjectView from "@/views/ProjectView.vue"
import ProjectsSearch from "@/views/ProjectsSearch.vue"
import TasksView from "@/views/TasksView.vue"
import { createRouter, createWebHistory } from "vue-router"
import { api } from "@/api/axios"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: "/account",
      name: "account",
      component: AccountView,
      meta: { requiresAuth: false },
    },
    {
      path: "/myPage",
      name: "myPage",
      component: MyPageView,
      meta: { requiresAuth: true },
    },
    {
      path: "/tasks",
      name: "tasks",
      component: TasksView,
      meta: { requiresAuth: true },
    },
    {
      path: "/projects/search",
      name: "projectsSearch",
      component: ProjectsSearch,
      meta: { requiresAuth: true },
    },
    {
      path: "/projects/show/:id",
      name: "projectShow",
      component: ProjectView,
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: "/offers/:id",
      name: "offerShow",
      component: OfferView,
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: "/chat/:id",
      name: "chatShow",
      component: ChatView,
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: "/users/:id",
      name: "profile",
      component: ProfileView,
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: "/logout",
      name: "logout",
      meta: { requiresAuth: true },
      // @ts-ignore
      beforeEnter: (to: any, from: any, next: (path: string) => {}) => {
        const userStore = useUserStore()
        userStore.logout()
        next("/login")
      },
    },
  ],
})

// グローバルナビゲーションガード
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // 初回アクセス時は必ず認証状態を確認
  await userStore.checkAuthStatus()

  // ログインページへの遷移の場合
  if (to.path === "/login") {
    if (userStore.isLoggedIn) {
      next("/myPage")
      return
    }
    next()
  }

  // その他のページの場合
  const requiresAuth = to.meta.requiresAuth
  if (requiresAuth && !userStore.isLoggedIn) {
    next("/login")
  } else {
    next()
  }
})

export default router
