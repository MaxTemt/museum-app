<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import BaseButton from '../components/BaseButton.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

const router = useRouter()
const { login, isLoading, error } = useAuth()

const form = reactive({
  username: '',
  password: ''
})

const handleSubmit = async () => {
  if (!form.username || !form.password) {
    return
  }

  try {
    const success = await login(form.username, form.password)
    if (success) {
      router.push('/')
    }
  } catch (e: any) {
    // Ошибка уже обрабатывается внутри useAuth и выводится через переменную error
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl border border-gray-100">
      <div>
        <div class="flex justify-center text-5xl mb-4">🏛️</div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Вход в систему
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 font-medium">
          Информационная система музея «Наследие»
        </p>
      </div>

      <div class="bg-indigo-50 rounded-lg p-4 mb-6 border border-indigo-100">
        <p class="text-xs text-indigo-800 font-semibold mb-1 uppercase tracking-wider">Тестовые данные для входа:</p>
        <p class="text-xs text-indigo-700">Логин: <code class="bg-white px-1 rounded">admin</code> | Пароль: <code class="bg-white px-1 rounded">123</code></p>
        <p class="text-xs text-indigo-700">Логин: <code class="bg-white px-1 rounded">museum_dir</code> | Пароль: <code class="bg-white px-1 rounded">root</code></p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <ErrorMessage v-if="error" :message="error" />

        <div class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-semibold text-gray-700 mb-1">Имя пользователя</label>
            <input 
              v-model="form.username"
              id="username" 
              name="username" 
              type="text" 
              required 
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all" 
              placeholder="Введите логин..." 
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-semibold text-gray-700 mb-1">Пароль доступа</label>
            <input 
              v-model="form.password"
              id="password" 
              name="password" 
              type="password" 
              required 
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all" 
              placeholder="Введите пароль..." 
            />
          </div>
        </div>

        <div>
          <BaseButton 
            type="submit" 
            class="w-full flex justify-center py-3 text-base font-bold shadow-indigo-200 shadow-lg"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Авторизация...' : 'Войти в панель' }}
          </BaseButton>
        </div>
      </form>
      
      <div class="mt-6 border-t pt-6 text-center">
        <p class="text-xs text-gray-400">© 2026 Museum Management System. Все права защищены.</p>
      </div>
    </div>
  </div>
</template>
