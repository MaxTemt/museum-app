<script setup lang="ts">
// Умный компонент обработки формы создания/модификации экспоната
import { reactive } from 'vue'
import BaseButton from './BaseButton.vue'
// Приём начальных данных, если мы редактируем, а не создаем
const props = defineProps<{
  initialData?: any
}>()
// Декларативное объявление событий (emits), передаваемых наверх
const emit = defineEmits<{
  (e: 'submit', data: any): void
  (e: 'cancel'): void
}>()
// Реактивное состояние объекта формы
const form = reactive({
  name: props.initialData?.name || '',
  category: props.initialData?.category || '',
  era: props.initialData?.era || '',
  acquisitionYear: props.initialData?.acquisitionYear || new Date().getFullYear(),
  description: props.initialData?.description || ''
})
// Локальная валидация введенных данных
const errors = reactive<Record<string, string>>({})
const validate = () => {
  errors.name = !form.name ? 'Требуется название' : ''
  errors.category = !form.category ? 'Требуется категория' : ''
  return !errors.name && !errors.category
}
const handleSubmit = () => {
  if (validate()) {
    emit('submit', { ...form })
  }
}
</script>
<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">Название экспоната *</label>
      <input v-model="form.name" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
      <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Категория *</label>
      <input v-model="form.category" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
      <p v-if="errors.category" class="text-red-500 text-xs mt-1">{{ errors.category }}</p>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Эпоха</label>
        <input v-model="form.era" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Год поступления</label>
        <input v-model="form.acquisitionYear" type="number" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Описание</label>
      <textarea v-model="form.description" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"></textarea>
    </div>
    <div class="pt-4 flex justify-end gap-2">
      <BaseButton type="button" variant="secondary" @click="emit('cancel')">Отмена</BaseButton>
      <BaseButton type="submit" variant="primary">Сохранить</BaseButton>
    </div>
  </form>
</template>
