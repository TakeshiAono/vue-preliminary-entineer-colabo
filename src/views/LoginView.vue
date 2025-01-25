<script setup lang="ts">
import router from "@/router"
import { useUserStore } from "@/stores/userStore"
import { ref } from "vue"
import { AxiosError } from "axios"
import type { FormInst } from "naive-ui"

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
const formRef = ref<FormInst | null>(null)

const userStore = useUserStore()

// バリデーションルール
const rules = {
  email: {
    required: true,
    message: "正しいメールアドレスを入力してください",
    validator: (rule: any, value: string | null) => {
      if(process.env.NODE_ENV == "development"){
        return
      } else {
        return new Promise((resolve, reject) => {
          if (!value) {
            reject("メールアドレスを入力してください")
          }
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) {
            reject("正しいメールアドレスを入力してください")
          }
          resolve(true)
        })
      }
    },
    trigger: "blur",
  },
  password: {
    required: true,
    message: "パスワードを入力してください",
    trigger: "blur",
  },
}

const submitHandler = async (): Promise<void> => {
  try {
    // バリデーションの実行
    await formRef.value?.validate()
    // ユーザーのログイン処理
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
      <n-form ref="formRef" :model="loginModel" :rules="rules" id="login-form">
        <n-form-item path="email" label="Email">
          <n-auto-complete
            v-model:value="loginModel.email"
            type="email"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input
            v-model:value="loginModel.password"
            type="password"
            @keydown.enter.prevent
          />
        </n-form-item>
        <div style="display: flex; justify-content: flex-end">
          <n-button
            :disabled="!loginModel.email || !loginModel.password"
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
}
</style>

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
}
</style>
