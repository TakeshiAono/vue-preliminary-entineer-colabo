<script setup lang="ts">
import router from "@/router"
import { useUserStore } from "@/stores/userStore"
import { ref } from "vue"
import type { FormInst } from "naive-ui"

type AccountModel = {
  email: string | null
  password: string | null
  name: string | null
  introduce: string | null
}

const accountModel = ref<AccountModel>({
  email: null,
  password: null,
  name: null,
  introduce: null,
})

const errorVisible = ref<boolean>(false)
const formRef = ref<FormInst | null>(null)

const rules = {
  email: {
    required: true,
    message: "正しいメールアドレスを入力してください",
    validator: (rule: any, value: string | null) => {
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
    },
    trigger: "blur",
  },
  name: {
    required: true,
    message: "名前を入力してください",
    trigger: "blur",
  },
  password: {
    required: true,
    message: "パスワードを入力してください",
    trigger: "blur",
  },
}

const userStore = useUserStore()

const submitHandler = async (): Promise<void> => {
  try {
    await formRef.value?.validate()
    console.log("Validation passed")
    await userStore.accountCreate(
      accountModel.value.name,
      accountModel.value.email,
      accountModel.value.password,
    )
    router.push("myPage")
  } catch (error) {
    console.error("Validation or account creation error:", error)
    errorVisible.value = true
  }
}
</script>

<template>
  <main>
    <div id="account-container">
      <h2 id="account-title">Account</h2>
      <n-alert title="認証エラー" type="error" v-if="errorVisible">
        このメールアドレスはすでに登録済みです。
      </n-alert>
      <n-form ref="formRef" :model="accountModel" :rules="rules" id="account-form">
        <n-form-item path="name" label="Name">
          <n-input v-model:value="accountModel.name" type="name" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="email" label="Email">
          <n-auto-complete v-model:value="accountModel.email" type="email" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input v-model:value="accountModel.password" type="password" @keydown.enter.prevent />
        </n-form-item>
        <div style="display: flex; justify-content: flex-end">
          <n-button
            :disabled="!accountModel.name || !accountModel.email || !accountModel.password"
            round
            type="primary"
            @click="submitHandler"
          >
            Register
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

#account-title {
  margin-bottom: 30px;
}

#account-container {
  width: 400px;
  margin: 0 auto;
  padding: 30px;
  border: solid;
  border-color: gray;
  border-radius: 30px;
}
</style>
