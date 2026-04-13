// Точка входа в приложение: инициализация Vue и подключение стилей
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
// Создание экземпляра приложения
const app = createApp(App)
// Подключение маршрутизатора
app.use(router)
// Монтирование приложения в DOM-элемент с id="app"
app.mount('#app')
