<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { isAuthenticated, logout, user } = useAuth()

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<template>
  <nav class="bg-indigo-900 text-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0 cursor-pointer" @click="router.push('/')">
            <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Музей «Наследие»
            </span>
          </div>
          
          <div v-if="isAuthenticated" class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link to="/" class="hover:bg-indigo-700 px-3 py-2 rounded-md font-medium transition-all" active-class="bg-indigo-800">Главная</router-link>
              <router-link to="/exhibits" class="hover:bg-indigo-700 px-3 py-2 rounded-md font-medium transition-all" active-class="bg-indigo-800">Экспонаты</router-link>
              <router-link to="/visitors" class="hover:bg-indigo-700 px-3 py-2 rounded-md font-medium transition-all" active-class="bg-indigo-800">Посетители</router-link>
              <router-link to="/events" class="hover:bg-indigo-700 px-3 py-2 rounded-md font-medium transition-all" active-class="bg-indigo-800">Выставки</router-link>
            </div>
          </div>
        </div>

        <div v-if="isAuthenticated" class="flex items-center gap-4">
          <div class="hidden sm:flex items-center gap-2 px-3 py-1 bg-indigo-800 rounded-full border border-indigo-700 text-sm">
            <div class="w-2 h-2 rounded-full bg-green-400"></div>
            <span class="text-indigo-200 font-medium">{{ user }}</span>
          </div>
          <button 
            @click="handleLogout"
            class="bg-indigo-800 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm border border-indigo-700 hover:border-red-500"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
