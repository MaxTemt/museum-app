<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useExhibits } from '../composables/useExhibits'
import BaseButton from '../components/BaseButton.vue'
import BaseTable from '../components/BaseTable.vue'
import BaseModal from '../components/BaseModal.vue'
import ExhibitForm from '../components/ExhibitForm.vue'
import PageHeader from '../components/PageHeader.vue'
import LoadingIndicator from '../components/LoadingIndicator.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

const router = useRouter()
const { exhibits, fetchExhibits, addExhibit, deleteExhibit, isLoading, error } = useExhibits()

onMounted(() => {
  fetchExhibits()
})

const searchQuery = ref('')
const sortOrder = ref<'asc' | 'desc'>('asc')
const isModalOpen = ref(false)

const columns = [
  { key: 'name', label: 'Название' },
  { key: 'category', label: 'Категория' },
  { key: 'era', label: 'Эпоха' },
  { key: 'acquisitionYear', label: 'Год пост.' }
]

const filteredExhibits = computed(() => {
  let result = exhibits.value
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
    <PageHeader title="Фонд экспонатов">
      <template #actions>
        <BaseButton @click="isModalOpen = true">+ Добавить экспонат</BaseButton>
      </template>
    </PageHeader>

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

    <ErrorMessage v-if="error" :message="error" />
    <LoadingIndicator v-if="isLoading">Обновление фондов...</LoadingIndicator>

    <BaseTable v-else :columns="columns" :data="filteredExhibits">
      <template #actions="{ row }">
        <div class="flex gap-2 justify-end">
          <button @click="router.push(`/exhibits/${row.id}`)" class="text-indigo-600 hover:text-indigo-900 font-medium">Просмотр</button>
          <button @click="handleDelete(row.id)" class="text-red-600 hover:text-red-900 font-medium">Удалить</button>
        </div>
      </template>
    </BaseTable>

    <BaseModal 
      :show="isModalOpen" 
      title="Новый экспонат" 
      @close="isModalOpen = false"
    >
      <ExhibitForm @submit="handleAddSubmit" @cancel="isModalOpen = false" />
    </BaseModal>
  </div>
</template>
