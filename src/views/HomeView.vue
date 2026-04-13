<script setup lang="ts">
import { onMounted } from 'vue'
import { useExhibits } from '../composables/useExhibits'
import { useVisitors } from '../composables/useVisitors'
import PageHeader from '../components/PageHeader.vue'
import StatsCard from '../components/StatsCard.vue'
import LoadingIndicator from '../components/LoadingIndicator.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

const { fetchExhibits, totalExhibits, isLoading: exhibitsLoading, error: exhibitsError } = useExhibits()
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
    <PageHeader title="Панель управления музеем" />
    
    <ErrorMessage v-if="exhibitsError" :message="exhibitsError" />

    <LoadingIndicator v-if="exhibitsLoading || visitorsLoading" />

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <StatsCard 
        title="Фонд музея" 
        :value="totalExhibits" 
        label="экспонатов" 
        colorClass="border-indigo-500"
      >
        <template #link>
          <router-link to="/exhibits" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Управление фондом &rarr;
          </router-link>
        </template>
      </StatsCard>

      <StatsCard 
        title="Посетители сегодня" 
        :value="activeVisitorsToday" 
        label="активных билетов" 
        colorClass="border-pink-500"
      >
        <template #link>
          <router-link to="/visitors" class="text-sm font-medium text-pink-600 hover:text-pink-500">
            Касса и учет &rarr;
          </router-link>
        </template>
      </StatsCard>
    </div>
  </div>
</template>
