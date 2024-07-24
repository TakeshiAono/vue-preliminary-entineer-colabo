<template>
  <main>
    <h2>オファーメッセージ</h2>
    <div id="offer-input">
      <textarea v-model="offerStore.offerMessage" placeholder="オファーメッセージを入力してください" rows="30" class="offer-textarea"></textarea>
      <n-button type="primary" @click="submitOffer" class="offer-submit-btn">オファーを出す</n-button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useOfferStore } from '@/stores/offerStore';
import { useUserStore } from "@/stores/userStore";

const props = defineProps<{ scoutedUserId: number }>();

const userStore = useUserStore();
const offerStore = useOfferStore();

const submitOffer = async () => {
  try {
    console.log('Offer message:', offerStore.offerMessage); 
    await offerStore.submitOffer(userStore.currentUser.id, props.scoutedUserId);
  } catch (error) {
    console.error('Error submitting offer:', error);
  }
};
</script>

<style scoped>
.offer-textarea {
  width: 100%;
  outline: none;
  resize: none;
}

#offer-input {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.offer-submit-btn{
  margin-top: 10px;
}

.n-dialog__content{
  margin-bottom: 0;
}
</style>
