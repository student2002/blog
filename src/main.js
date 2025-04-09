import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { globalRegister } from './global' //引入
import 'element-plus/theme-chalk/display.css'
createApp(App).use(globalRegister).use(router).mount('#app')
