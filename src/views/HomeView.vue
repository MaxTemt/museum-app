<script setup lang="ts">
import { onMounted } from 'vue'
import { useExhibits } from '../composables/useExhibits'
import { useVisitors } from '../composables/useVisitors'
const { fetchExhibits, totalExhibits, isLoading: exhibitsLoading } = useExhibits()
const { fetchVisitors, activeVisitorsToday, isLoading: visitorsLoading } = useVisitors()
onMounted(async () => {
  await Promise.all([
    fetchExhibits(),
    fetchVisitors()
  ])
})
</script>
<template>
  <div>
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Панель управления музеем</h1>
    <div v-if="exhibitsLoading || visitorsLoading" class="text-center py-10">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <p class="mt-2 text-gray-500">Загрузка данных...</p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow-md p-6 border-t-4 border-indigo-500">
        <h2 class="text-xl font-semibold text-gray-700 mb-2">Фонд музея</h2>
        <div class="mt-4 flex items-baseline text-4xl font-extrabold text-indigo-600">
          {{ totalExhibits }}
          <span class="ml-2 text-lg font-medium text-gray-500">экспонатов</span>
        </div>
        <div class="mt-4">
          <router-link to="/exhibits" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Управление фондом &rarr;
          </router-link>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-md p-6 border-t-4 border-pink-500">
        <h2 class="text-xl font-semibold text-gray-700 mb-2">Посетители сегодня</h2>
        <div class="mt-4 flex items-baseline text-4xl font-extrabold text-pink-600">
          {{ activeVisitorsToday }}
          <span class="ml-2 text-lg font-medium text-gray-500">активных билетов</span>
        </div>
        <div class="mt-4">
          <router-link to="/visitors" class="text-sm font-medium text-pink-600 hover:text-pink-500">
            Касса и учет &rarr;
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
