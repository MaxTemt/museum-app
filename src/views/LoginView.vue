<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()
const { login, register } = useAuth()

const isLogin = ref(true)
const isLoading = ref(false)
const error = ref('')

const form = reactive({
  username: '',
  password: ''
})

const handleSubmit = async () => {
  if (!form.username || !form.password) {
    error.value = 'Пожалуйста, заполните все поля'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    if (isLogin.value) {
      await login(form.username)
    } else {
      await register(form.username)
    }
    router.push('/')
  } catch (e) {
    error.value = 'Ошибка входа. Попробуйте еще раз.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl border border-gray-100">
      <div>
        <div class="flex justify-center">
          <span class="text-4xl">🏛️</span>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ isLogin ? 'Вход в систему' : 'Регистрация' }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Управление музейным наследием «Наследие»
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div v-if="error" class="bg-red-50 text-red-700 p-3 rounded-md text-sm text-center font-medium border border-red-100 italic">
          {{ error }}
        </div>

        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Логин</label>
            <input 
              v-model="form.username"
              id="username" 
              name="username" 
              type="text" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
              placeholder="Логин или Email" 
            />
          </div>
          <div>
            <label for="password" class="sr-only">Пароль</label>
            <input 
              v-model="form.password"
              id="password" 
              name="password" 
              type="password" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
              placeholder="Пароль" 
            />
          </div>
        </div>

        <div>
          <BaseButton 
            type="submit" 
            class="group relative w-full flex justify-center py-3 px-4 text-sm font-medium"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Обработка...' : (isLogin ? 'Войти' : 'Зарегистрироваться') }}
          </BaseButton>
        </div>

        <div class="text-center">
          <button 
            type="button"
            @click="isLogin = !isLogin"
            class="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            {{ isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
