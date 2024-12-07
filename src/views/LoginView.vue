<script setup lang="ts">
import router from "@/router"
import { useUserStore } from "@/stores/userStore"
import { ref } from "vue"
import { AxiosError } from "axios"

type LoginModel = {
  email: string | null
  password: string | null
}

const loginModel = ref<LoginModel>({
  email: null,
  password: null,
})
const errorVisible = ref<boolean>(false)
const validationMessage = ref<string>("")

const userStore = useUserStore()

const assertValidCredentials: (
  params: LoginModel,
) => asserts params is { email: string; password: string } = (params) => {
  // とりあえずnull, undefined, "", 0は無効な値として弾く
  if (!params.email) {
    throw new Error("invalid email")
  }
  if (!params.password) {
    throw new Error("invalid password")
  }

  return
}

const submitHandler = async (): Promise<void> => {
  try {
    assertValidCredentials(loginModel.value)

    await userStore.login(loginModel.value.email, loginModel.value.password)

    router.push("myPage")
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const code = error.code
      if (code == "ERR_BAD_REQUEST") {
        validationMessage.value = "メールアドレスまたはパスワードが間違っています。"
      } else {
        validationMessage.value =
          "通信エラーが発生しました。時間を置いて再度ログインをしてください。"
      }
    } else {
      validationMessage.value = "予期せぬエラーが発生しました。"
    }
    errorVisible.value = true
  }
}
</script>

<template>
  <main>
    <div id="login-container">
      <h2 id="login-title">Login</h2>
      <n-alert title="認証エラー" type="error" v-if="errorVisible">
        {{ validationMessage }}
      </n-alert>
      <n-form ref="formRef" :model="loginModel" id="login-form">
        <n-form-item path="email" label="Email">
          <n-input v-model:value="loginModel.email" type="email" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input v-model:value="loginModel.password" type="password" @keydown.enter.prevent />
        </n-form-item>
        <div style="display: flex; justify-content: flex-end">
          <n-button
            :disabled="loginModel.email == null || loginModel.password == null"
            round
            type="primary"
            @click="submitHandler"
          >
            Login
          </n-button>
        </div>
      </n-form>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  margin: 0px 0px;
  display: flex;
  align-items: center;
}

#login-title {
  margin-bottom: 30px;
}

#login-container {
  width: 400px;
  margin: 0 auto;
  padding: 30px;
  border: solid;
  border-color: gray;
  border-radius: 30px;
}

.error-message {
  background-color: rgba(255, 0, 0, 0.359);
  border: solid;
  border-color: red;
  /* opacity: 0.1; */
}
</style>
