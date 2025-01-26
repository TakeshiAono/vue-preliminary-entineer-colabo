<template>
  <main>
    <!-- <p>ログイン中のユーザー{{ userStore.currentUser.name }}</p> -->
    <div id="selected-user-name">
      <h1>{{ user?.name }}さんのプロフィール</h1>
      <n-button
        strong
        secondary
        circle
        type="warning"
        v-if="route.params.id == userStore.currentUser.id"
        @click="
          () => {
            editModal = true
          }
        "
      >
        <n-icon size="20">
          <CreateOutline />
        </n-icon>
      </n-button>
      <n-button
        v-if="user && userStore.currentUser && user.id !== userStore.currentUser.id"
        @click="showModal = true"
      >
        オファーを出す
      </n-button>
    </div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    <UserIntroduction :user="user" />
    <UserProjects :projectIds="user?.projectIds || []" />
    <UserFollowers :userId="user?.id" />
    <SubmitOffer
      v-if="showModal"
      :scoutedUserId="user?.id"
      :scoutedUserProjectIds="user?.projectIds || []"
      v-model:show="showModal"
      @update:show="showModal = $event"
      @cancel="handleClose"
      @success="handleSuccess"
    />
    <n-modal
      :show="editModal"
      preset="dialog"
      positive-text="変更"
      negative-text="キャンセル"
      @positive-click="
        async () => {
          try {
            userStore.currentUser.password = newPassword
            await userStore.putUser(
              userStore.currentUser
            )
          } finally {
            router.go({ path: `/users/${userStore.currentUser.id}`, force: true })
          }
        }
      "
      @negative-click="
        () => {
          editModal = false
        }
      "
      title="プロジェクト編集"
    >
      <div id="project-name-input">
        <div>
          <h3>ユーザー名</h3>
          <n-input
            v-model:value="userStore.currentUser.name"
            type="text"
            placeholder=""
          />
        </div>
        <div>
          <h3>メールアドレス</h3>
          <n-input
            v-model:value="userStore.currentUser.email"
            type="text"
            placeholder=""
          />
        </div>
        <div>
          <h3>パスワード</h3>
          <n-input
            v-model:value="newPassword"
            type="text"
            placeholder=""
          />
        </div>
        <div>
          <h3>紹介文</h3>
          <n-input
            v-model:value="userStore.currentUser.introduce"
            type="text"
            placeholder=""
          />
        </div>
      </div>
    </n-modal>
  </main>
</template>

<script setup lang="ts">
import SubmitOffer from "@/components/SubmitOffer.vue"
import UserFollowers from "@/components/UserFollowers.vue"
import UserProjects from "@/components/UserProjects.vue"
import { useProjectStore } from "@/stores/projectStore"
import { useUserStore } from "@/stores/userStore"
import { CreateOutline } from "@vicons/ionicons5"
import { onMounted, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"

const showModal = ref(false)
const editModal = ref(false)
const successMessage = ref<string | null>(null)

const userStore = useUserStore()
const user = ref<User | null>(null)
const userProjectIds = ref<number[]>([])
const newPassword = ref<string>("")
const route = useRoute()
const userId = parseInt(route.params.id as string, 10)
const projectStore = useProjectStore()
const router = useRouter()

onMounted(async () => {
  try {
    const userInfo = await userStore.getUserInfo(userId)
    user.value = userInfo
    if (userInfo?.projectIds) {
      await projectStore.setProjects(userInfo.projectIds)
      userProjectIds.value = projectStore.getBelongingProjectIds()
    }
  } catch (error) {
    console.error("Error fetching user info:", error)
  }
})

watch([() => user.value, () => userStore.currentUser], async ([newUser, currentUser]) => {
  if (newUser && currentUser) {
    try {
      // プロジェクトのオプションをリセット
      if (newUser.projectIds) {
        await projectStore.setProjects(newUser.projectIds)
        userProjectIds.value = projectStore.getBelongingProjectIds()
      }
    } catch (error) {
      console.error("Error updating project options:", error)
    }
  }
})

const handleClose = () => {
  showModal.value = false
}

const handleSuccess = () => {
  showModal.value = false
  successMessage.value = "オファーを送信しました！"
}
</script>

<style scoped>
#selected-user-name {
  display: flex;
  align-items: center;
  gap: 15px;
}
.success-message {
  color: green;
  margin-top: 1rem;
}
</style>
