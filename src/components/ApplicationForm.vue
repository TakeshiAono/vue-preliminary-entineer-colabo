<script setup lang="ts">
import { NButton } from "naive-ui"
import { ref } from "vue"

const emit = defineEmits<{
  submit: [message: string]
}>()

const applicationMessage = ref("")

const handleSubmit = () => {
  emit("submit", applicationMessage.value)
  applicationMessage.value = ""
}
</script>

<template>
  <div>
    <h1>応募フォーム</h1>
    <div id="application-form-content">
      <textarea
        v-model="applicationMessage"
        placeholder="プロジェクトオーナーに向けたメッセージを入力してください"
        rows="8"
        style="width: 100%; box-sizing: border-box; border: none; outline: none; resize: none"
      ></textarea>
      <div class="btn-wrapper">
        <n-button type="primary" @click="handleSubmit" class="application-submit-btn">
          参加希望を出す
        </n-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#application-form-content {
  max-width: 600px;
  width: 100%;
  height: 170px;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 10px;
  border: solid;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.application-submit-btn {
  display: block;
  margin-left: auto;
}
</style>
