<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

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

const userStore = useUserStore()

const submitHandler = (): void => {
  userStore.accountCreate(accountModel.value.name, accountModel.value.email, accountModel.value.password)
    .then(() => {
      router.push("myPage")
    })
    .catch((error) => {
      console.log(error)
      errorVisible.value = true
    })
}
</script>

<template>
  <main>
    <div id="account-container">
      <h2 id="account-title">Account</h2>
      <n-alert title="認証エラー" type="error" v-if="errorVisible">
        このメールアドレスはすでに登録済みです。
      </n-alert>
      <n-form ref="formRef" :model="accountModel" id="account-form">
        <n-form-item path="name" label="Name">
          <n-input v-model:value="accountModel.name" type="name" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="email" label="Email">
          <n-input v-model:value="accountModel.email" type="email" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input v-model:value="accountModel.password" type="password" @keydown.enter.prevent />
        </n-form-item>
        <div style="display: flex; justify-content: flex-end">
          <n-button :disabled="(accountModel.name == null || accountModel.email == null || accountModel.password == null)" round type="primary"
            @click="submitHandler">
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
