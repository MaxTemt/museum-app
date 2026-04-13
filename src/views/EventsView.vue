<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useEvents } from '../composables/useEvents'
import BaseButton from '../components/BaseButton.vue'
const { events, fetchEvents, addEvent, deleteEvent, isEventActive, isLoading } = useEvents()
onMounted(() => fetchEvents())
const isAdding = ref(false)
const form = reactive({
  name: '',
  startDate: '',
  endDate: '',
  location: '',
  description: ''
})
const handleAdd = async () => {
  if (!form.name || !form.startDate || !form.endDate) return alert('Заполните обязательные поля')
  await addEvent({ ...form })
  isAdding.value = false
  form.name = ''
  form.startDate = ''
  form.endDate = ''
  form.location = ''
  form.description = ''
}
</script>
<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Временные выставки</h1>
      <BaseButton @click="isAdding = !isAdding">{{ isAdding ? 'Отмена' : '+ Создать выставку' }}</BaseButton>
    </div>
    <div v-if="isAdding" class="bg-white p-6 rounded-lg shadow mb-6">
      <form @submit.prevent="handleAdd" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Название *</label>
          <input v-model="form.name" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Дата начала *</label>
            <input v-model="form.startDate" type="date" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Дата окончания *</label>
            <input v-model="form.endDate" type="date" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700">Расположение</label>
            <input v-model="form.location" type="text" class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700">Описание</label>
            <textarea v-model="form.description" rows="2" class="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
          </div>
        </div>
        <div class="flex justify-end">
          <BaseButton type="submit">Создать</BaseButton>
        </div>
      </form>
    </div>
    <div v-if="isLoading" class="text-center py-10">Обновление...</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="event in events" 
        :key="event.id"
        class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
        :class="{ 'ring-2 ring-indigo-500': isEventActive(event) }"
      >
        <div class="p-4 flex-grow">
          <div class="flex justify-between items-start">
            <h3 class="text-xl font-bold text-gray-900">{{ event.name }}</h3>
            <span v-if="isEventActive(event)" class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">Активна</span>
          </div>
          <p class="text-sm text-gray-500 mt-1">
            {{ event.startDate }} — {{ event.endDate }}
          </p>
          <p class="text-sm font-medium text-indigo-600 mt-2">Локация: {{ event.location }}</p>
          <p class="mt-4 text-gray-700 text-sm line-clamp-3">{{ event.description }}</p>
        </div>
        <div class="px-4 py-3 bg-gray-50 border-t flex justify-between items-center">
          <button @click="deleteEvent(event.id)" class="text-red-600 hover:text-red-800 text-sm font-medium">Удалить</button>
        </div>
      </div>
      <div v-if="events.length === 0" class="col-span-full text-center text-gray-500 py-10">
        Нет запланированных выставок
      </div>
    </div>
  </div>
</template>
