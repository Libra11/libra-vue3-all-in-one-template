/*
 * @Author: Libra
 * @Date: 2023-03-07 14:15:32
 * @LastEditTime: 2023-04-07 13:56:34
 * @LastEditors: Libra
 * @Description: 入口文件
 */
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

// 样式
import '@/style/index.scss'
import 'element-plus/theme-chalk/el-message.css'
import '@/style/index.css'
import 'animate.css'

const app = createApp(App)
app.use(router)
app.use(store)

app.mount('#app')
