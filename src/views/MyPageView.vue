<script setup lang="ts">
import router from '@/router';
import axios from 'axios';
import { ref } from 'vue';
import { RouterView } from 'vue-router';

// type LoginModel = {
//   email: string | null
//   password: string | null
// }

const API_URL = import.meta.env.VITE_API_SERVER_URI;
// const loginModel = ref<LoginModel>({
//   email: null,
//   password: null,
// })

// const a = ref(true)
// const aa = () => {console.log("aser")}
// console.log(API_URL)
// const submitHandler = (event): void => {
//   axios.post(`${API_URL}/login`, { "password": loginModel.value.password, "email": loginModel.value.email })
//     .then((data) => {
//       console.log(data, "成功")
//       router.push("account")
//     })
//     .catch((error) => {
//       console.log(error, "エラー")
//       router.push("mypage")
//     })
// }
</script>

<template>
  <main>
    <!-- <n-form ref="formRef" :model="loginModel">
      <n-form-item path="email" label="Email">
        <n-input v-model:value="loginModel.email" @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="password" label="Password">
        <n-input v-model:value="loginModel.password" type="password" @keydown.enter.prevent />
      </n-form-item>
      <div style="display: flex; justify-content: flex-end">
        <n-button :disabled="loginModel.email === null && loginModel.password === null" round type="primary" @click="submitHandler">
          Validate
        </n-button>
      </div>
    </n-form> -->
    <p>mypage</p>
  </main>
</template>

<style scoped>
p {
  background-color: red;
}

header {
  background-color: blue;
}

footer {
  background-color: yellow;
}
</style>
