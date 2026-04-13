<script setup lang="ts">
// Главное представление (страница) раздела Экспонатов
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useExhibits } from '../composables/useExhibits'
import BaseButton from '../components/BaseButton.vue'
import BaseTable from '../components/BaseTable.vue'
import BaseModal from '../components/BaseModal.vue'
import ExhibitForm from '../components/ExhibitForm.vue'
const router = useRouter()
// Подключение глобального состояния (store) через Composition API
const { exhibits, fetchExhibits, addExhibit, deleteExhibit, isLoading } = useExhibits()
// Автоматический запрос списка элементов при монтировании компонента на экран
onMounted(() => {
  fetchExhibits()
})
// Реактивные переменные для работы с интерфейсом клиентской сортировки и поиска
const searchQuery = ref('')
const sortOrder = ref<'asc' | 'desc'>('asc')
const isModalOpen = ref(false)
const columns = [
  { key: 'name', label: 'Название' },
  { key: 'category', label: 'Категория' },
  { key: 'era', label: 'Эпоха' },
  { key: 'acquisitionYear', label: 'Год пост.' }
]
// Вычисляемое свойство: список данных, пропущенный через фильтр и сортировку
const filteredExhibits = computed(() => {
  let result = exhibits.value
  // Логика текстового поиска без учета регистра
  if (searchQuery.value) {
    result = result.filter(e => 
      e.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      e.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  result = [...result].sort((a, b) => {
    if (sortOrder.value === 'asc') return a.acquisitionYear - b.acquisitionYear
    return b.acquisitionYear - a.acquisitionYear
  })
  return result
})
const handleAddSubmit = async (data: any) => {
  await addExhibit(data)
  isModalOpen.value = false
}
const handleDelete = async (id: string) => {
  if (confirm('Вы уверены, что хотите удалить этот экспонат?')) {
    await deleteExhibit(id)
  }
}
</script>
<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Фонд экспонатов</h1>
      <BaseButton @click="isModalOpen = true">+ Добавить экспонат</BaseButton>
    </div>
    <div class="bg-white p-4 rounded-lg shadow mb-6 flex gap-4 items-center">
      <div class="flex-1">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Поиск по названию или категории..." 
          class="w-full border p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <select v-model="sortOrder" class="border p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
          <option value="asc">Сначала старые (поступление)</option>
          <option value="desc">Сначала новые (поступление)</option>
        </select>
      </div>
    </div>
    <div v-if="isLoading" class="text-center py-10 text-xl">Загрузка данных...</div>
    <BaseTable v-else :columns="columns" :data="filteredExhibits">
      <template #actions="{ row }">
        <div class="flex gap-2 justify-end">
          <button @click="router.push(`/exhibits/${row.id}`)" class="text-indigo-600 hover:text-indigo-900">Просмотр</button>
          <button @click="handleDelete(row.id)" class="text-red-600 hover:text-red-900">Удалить</button>
        </div>
      </template>
    </BaseTable>
    <BaseModal 
      :show="isModalOpen" 
      title="Новый экспонат" 
      @close="isModalOpen = false"
    >
      <ExhibitForm @submit="handleAddSubmit" @cancel="isModalOpen = false" />
      <template #footer><span></span></template> 
    </BaseModal>
  </div>
</template>
