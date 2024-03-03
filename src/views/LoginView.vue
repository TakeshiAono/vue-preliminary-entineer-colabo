<script setup lang="ts">
import router from '@/router';
import axios from 'axios';
import { ref } from 'vue';

type LoginModel = {
  email: string | null
  password: string | null
}

const API_URL = import.meta.env.VITE_API_SERVER_URI;
const loginModel = ref<LoginModel>({
  email: null,
  password: null,
})

const submitHandler = (): void => {
  axios.post(`${API_URL}/login`, { "password": loginModel.value.password, "email": loginModel.value.email })
    .then((data) => {
      console.log(data, "成功")
      router.push("myPage")
    })
    .catch((error) => {
      console.log(error, "エラー")
      router.push("account")
    })
}
</script>

<template>
  <main>
    <div id="login-container">
      <h2 id="login-title">ログイン</h2>
      <n-form ref="formRef" :model="loginModel" id="login-form">
        <n-form-item path="email" label="Email">
          <n-input v-model:value="loginModel.email" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input v-model:value="loginModel.password" type="password" @keydown.enter.prevent />
        </n-form-item>
        <div style="display: flex; justify-content: flex-end">
          <n-button :disabled="(loginModel.email == null || loginModel.password == null)" round type="primary"
            @click="submitHandler">
            登録
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
  width: 50%;
  margin: 0 auto;
  padding: 30px;
  border: solid;
  border-color: gray;
  border-radius: 30px;
}
</style>
