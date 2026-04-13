<script setup lang="ts">
// Корневой компонент приложения. Настройка глобального лэйаута (шаблона) пути.
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'
</script>
<template>
  <!-- Основная обертка с Flexbox для прижатия футера к низу -->
  <div class="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
    <AppNavbar />
    <main class="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
      <!-- Контейнер для динамической подгрузки страниц через маршрутизатор (Vue Router) -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
  </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
