import { createApp } from 'vue'
// import './style.css'
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';

// import Vant from 'vant';
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router/index.js'


const app = createApp(App);
// app.use(Vant);
app.use(router);

app.mount('#app');
