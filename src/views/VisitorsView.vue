<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useVisitors } from '../composables/useVisitors'
import BaseButton from '../components/BaseButton.vue'
import BaseTable from '../components/BaseTable.vue'
const { visitors, fetchVisitors, addVisitor, cancelTicket, isLoading } = useVisitors()
onMounted(() => {
  fetchVisitors()
})
const isAdding = ref(false)
const form = reactive({
  name: '',
  ticketType: 'standard' as any,
  visitDate: new Date().toISOString().split('T')[0]
})
const columns = [
  { key: 'name', label: 'ФИО Посетителя/Группы' },
  { key: 'ticketType', label: 'Тип билета' },
  { key: 'visitDate', label: 'Дата' },
  { key: 'status', label: 'Статус' }
]
const handleAdd = async () => {
  if (!form.name) return alert('Введите имя')
  await addVisitor({ ...form })
  form.name = ''
  isAdding.value = false
}
const getStatusBadge = (status: string) => {
  const map: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return map[status] || 'bg-gray-100'
}
const getTicketType = (type: string) => {
  const map: Record<string, string> = {
    standard: 'Стандартный',
    student: 'Студенческий',
    child: 'Детский',
    vip: 'VIP'
  }
  return map[type] || type
}
</script>
<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Касса и Учет Посетителей</h1>
      <BaseButton @click="isAdding = !isAdding">{{ isAdding ? 'Отмена' : '+ Продать билет' }}</BaseButton>
    </div>
    <div v-if="isAdding" class="bg-white p-6 rounded-lg shadow mb-6">
      <h2 class="text-xl mb-4 font-semibold">Оформление билета</h2>
      <form @submit.prevent="handleAdd" class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label class="block text-sm font-medium text-gray-700">ФИО</label>
          <input v-model="form.name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Тип</label>
          <select v-model="form.ticketType" class="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="standard">Стандартный</option>
            <option value="student">Студенческий</option>
            <option value="child">Детский</option>
            <option value="vip">VIP</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Дата посещения</label>
          <input v-model="form.visitDate" type="date" required class="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <BaseButton type="submit" class="w-full">Оформить</BaseButton>
        </div>
      </form>
    </div>
    <div v-if="isLoading" class="text-center py-4">Обновление данных...</div>
    <BaseTable :columns="columns" :data="visitors">
      <template #cell-status="{ row }">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="getStatusBadge(row.status)">
          {{ row.status === 'active' ? 'Активен' : row.status === 'completed' ? 'Завершен' : 'Отменен' }}
        </span>
      </template>
      <template #cell-ticketType="{ row }">
        {{ getTicketType(row.ticketType) }}
      </template>
      <template #actions="{ row }">
        <button 
          v-if="row.status === 'active'"
          @click="cancelTicket(row.id)" 
          class="text-red-600 hover:text-red-900"
        >
          Отменить
        </button>
      </template>
    </BaseTable>
  </div>
</template>
