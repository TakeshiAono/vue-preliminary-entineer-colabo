<template>
  <main>
    <h2>オファーを出す</h2>
    <div id="offer-input">
      <textarea v-model="offerMessage" placeholder="オファーメッセージを入力" rows="10" cols="20"></textarea>
      <p><button @click="submitOffer">オファーを出す</button></p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import axios from 'axios';
import { ref } from 'vue';

const props = defineProps<{ scoutedUserId: number }>();

const offerMessage = ref('');
const userStore = useUserStore();

const submitOffer = async () => {
  try {
    console.log('Offer message:', offerMessage.value); 
    const response = await axios.post(`${import.meta.env.VITE_API_SERVER_URI}/offers/create`, {
      message: offerMessage.value,
      userId: userStore.currentUser.id,
      scoutedUserId: props.scoutedUserId
    });
    console.log('Offer submitted response:', response);
  } catch (error) {
    console.error('Error submitting offer:', error);
  }
};
</script>

<style scoped>
#offer-input {
  width: 200px;
  height: auto;
  border-radius: 10px;
  border: solid;
  padding: 20px;
}

p{
  margin: 0;
}
</style>
