import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui/es/preset'
import VueApexCharts from 'vue3-apexcharts';
import io from 'socket.io-client';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)
app.use(VueApexCharts)

const socket = io(); // Socket.ioのインスタンスを作成

app.provide('socket', socket); // Vue 3のprovideを使用してインスタンスを提供

app.mount('#app')
