<script setup lang="ts">
import { onMounted } from 'vue'
import { useEvents } from '../composables/useEvents'
import BaseButton from '../components/BaseButton.vue'
import BaseTable from '../components/BaseTable.vue'
import PageHeader from '../components/PageHeader.vue'
import LoadingIndicator from '../components/LoadingIndicator.vue'

const { events, fetchEvents, addEvent, deleteEvent, isLoading } = useEvents()

onMounted(() => {
  fetchEvents()
})

const columns = [
  { key: 'name', label: 'Название события' },
  { key: 'startDate', label: 'Начало' },
  { key: 'endDate', label: 'Конец' },
  { key: 'location', label: 'Локация' }
]

const handleAdd = async () => {
  const name = prompt('Введите название события:')
  if (!name) return
  await addEvent({
    name,
    description: 'Новое событие',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    location: 'Основной зал'
  })
}
</script>

<template>
  <div>
    <PageHeader title="Мероприятия и выставки">
      <template #actions>
        <BaseButton @click="handleAdd">+ Создать событие</BaseButton>
      </template>
    </PageHeader>

    <LoadingIndicator v-if="isLoading" />

    <BaseTable v-else :columns="columns" :data="events">
      <template #actions="{ row }">
        <button @click="deleteEvent(row.id)" class="text-red-600 hover:text-red-900 font-medium">Удалить</button>
      </template>
    </BaseTable>
  </div>
</template>
