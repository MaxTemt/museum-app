<script setup lang="ts">
</script>
<template>
  <nav class="bg-indigo-900 text-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Музей «Наследие»
            </span>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link to="/" class="hover:bg-indigo-700 px-3 py-2 rounded-md font-medium transition-colors" active-class="bg-indigo-800">Главная</router-link>
              <router-link to="/exhibits" class="hover:bg-indigo-700 px-3 py-2 rounded-md font-medium transition-colors" active-class="bg-indigo-800">Экспонаты</router-link>
              <router-link to="/visitors" class="hover:bg-indigo-700 px-3 py-2 rounded-md font-medium transition-colors" active-class="bg-indigo-800">Посетители</router-link>
              <router-link to="/events" class="hover:bg-indigo-700 px-3 py-2 rounded-md font-medium transition-colors" active-class="bg-indigo-800">Выставки</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
