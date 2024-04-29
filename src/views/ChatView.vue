<script>
export default {
  data() {
    return {
      socket: null,
      text: null,
      receiveMessage: "返信なし",
      channelId: null,
      userId: null,
      message: "",
      content: "",
    };
  },

  created() {
    this.socket = new WebSocket('ws://localhost:8080/websocket');
    this.socket.onmessage = (event) => {
      console.log('Message from server ', event.data);
      this.receiveMessage = event.data
    };
    this.socket.onopen = (socket, event) => {
      console.log('WebSocketが接続されました');
      console.log(socket.target)
      console.log(event)
    };
  },

  methods: {
    sendMessage() {
      this.socket.send(JSON.stringify({userId: this.userId, channelId: this.channelId, message: this.message, content: this.content}))
    },
  }
}
</script>

<template>
  <main>
    <div>
      userID
      <input v-model="userId" placeholder="Type your message">
      channelID
      <input v-model="channelId" placeholder="Type your message">
      message
      <input v-model="message" placeholder="Type your message">
      content
      <input v-model="content" placeholder="Type your message">
      送信
      <button @click="sendMessage">Send</button>
      <p>
        {{ this.receiveMessage }}
      </p>
    </div>
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
