<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useExhibits } from '../composables/useExhibits'
import type { Exhibit } from '../types'
import BaseButton from '../components/BaseButton.vue'
import ExhibitForm from '../components/ExhibitForm.vue'
import PageHeader from '../components/PageHeader.vue'
import LoadingIndicator from '../components/LoadingIndicator.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

const props = defineProps<{ id: string }>()
const router = useRouter()
const { getExhibitById, updateExhibit, deleteExhibit, error } = useExhibits()

const exhibit = ref<Exhibit | null>(null)
const isLoading = ref(true)
const isEditing = ref(false)

onMounted(async () => {
  const data = await getExhibitById(props.id)
  if (data) {
    exhibit.value = data
  } else {
    setTimeout(() => router.push('/exhibits'), 2000)
  }
  isLoading.value = false
})

const handleUpdate = async (data: any) => {
  await updateExhibit(props.id, data)
  exhibit.value = { ...exhibit.value, ...data }
  isEditing.value = false
}

const handleDelete = async () => {
  if (confirm('Удалить экспонат?')) {
    await deleteExhibit(props.id)
    router.push('/exhibits')
  }
}
</script>

<template>
  <div>
    <LoadingIndicator v-if="isLoading" />
    <ErrorMessage v-else-if="error" :message="error" />
    <div v-else-if="!exhibit" class="text-center py-10">
      <ErrorMessage message="Экспонат не найден. Возвращение к списку..." />
    </div>

    <div v-else class="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto">
      <PageHeader :title="exhibit.name">
        <template #actions>
          <BaseButton variant="secondary" @click="router.push('/exhibits')">Назад</BaseButton>
        </template>
      </PageHeader>

      <div v-if="!isEditing" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h3 class="text-sm font-medium text-gray-500">Категория</h3>
            <p class="mt-1 text-lg text-gray-900">{{ exhibit.category }}</p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-500">Эпоха</h3>
            <p class="mt-1 text-lg text-gray-900">{{ exhibit.era }}</p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-500">Год поступления</h3>
            <p class="mt-1 text-lg text-gray-900">{{ exhibit.acquisitionYear }}</p>
          </div>
        </div>
        <div class="pt-4 border-t">
          <h3 class="text-sm font-medium text-gray-500 mb-2">Описание</h3>
          <p class="text-gray-700 whitespace-pre-wrap">{{ exhibit.description }}</p>
        </div>
        <div class="pt-6 flex gap-3">
          <BaseButton variant="primary" @click="isEditing = true">Редактировать</BaseButton>
          <BaseButton variant="danger" @click="handleDelete">Удалить</BaseButton>
        </div>
      </div>
      <div v-else>
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Редактирование данных</h2>
        <ExhibitForm 
          :initial-data="exhibit" 
          @submit="handleUpdate"
          @cancel="isEditing = false"
        />
      </div>
    </div>
  </div>
</template>
