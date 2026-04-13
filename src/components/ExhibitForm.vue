<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps<{
  initialData?: any
}>()

const emit = defineEmits<{
  (e: 'submit', data: any): void
  (e: 'cancel'): void
}>()

const form = reactive({
  name: props.initialData?.name || '',
  category: props.initialData?.category || '',
  era: props.initialData?.era || '',
  acquisitionYear: props.initialData?.acquisitionYear || new Date().getFullYear(),
  description: props.initialData?.description || ''
})

const errors = reactive<Record<string, string>>({
  name: '',
  category: '',
  acquisitionYear: ''
})

const isSubmitted = ref(false)

const validate = () => {
  let isValid = true
  
  if (!form.name.trim()) {
    errors.name = 'Название экспоната обязательно для заполнения'
    isValid = false
  } else {
    errors.name = ''
  }

  if (!form.category.trim()) {
    errors.category = 'Укажите категорию (например: Живопись, Скульптура)'
    isValid = false
  } else {
    errors.category = ''
  }

  if (form.acquisitionYear > new Date().getFullYear()) {
    errors.acquisitionYear = 'Год поступления не может быть в будущем'
    isValid = false
  } else if (form.acquisitionYear < 0) {
    errors.acquisitionYear = 'Год не может быть отрицательным'
    isValid = false
  } else {
    errors.acquisitionYear = ''
  }

  return isValid
}

const handleSubmit = () => {
  isSubmitted.value = true
  if (validate()) {
    emit('submit', { ...form })
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Название экспоната *</label>
      <input 
        v-model="form.name" 
        type="text" 
        :class="['mt-1 block w-full rounded-md border p-2 shadow-sm focus:ring-indigo-500 sm:text-sm', errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500']"
        placeholder="Напр: Золотая маска"
      />
      <p v-if="errors.name" class="text-red-500 text-xs mt-1 font-medium">{{ errors.name }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Категория *</label>
      <input 
        v-model="form.category" 
        type="text" 
        :class="['mt-1 block w-full rounded-md border p-2 shadow-sm focus:ring-indigo-500 sm:text-sm', errors.category ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500']"
        placeholder="Напр: Археология"
      />
      <p v-if="errors.category" class="text-red-500 text-xs mt-1 font-medium">{{ errors.category }}</p>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Эпоха / Период</label>
        <input 
          v-model="form.era" 
          type="text" 
          class="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
          placeholder="Напр: XVIII век"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Год поступления</label>
        <input 
          v-model="form.acquisitionYear" 
          type="number" 
          :class="['mt-1 block w-full rounded-md border p-2 shadow-sm focus:ring-indigo-500 sm:text-sm', errors.acquisitionYear ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500']"
        />
        <p v-if="errors.acquisitionYear" class="text-red-500 text-xs mt-1 font-medium">{{ errors.acquisitionYear }}</p>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Описание экспоната</label>
      <textarea 
        v-model="form.description" 
        rows="4" 
        class="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Подробное описание предмета..."
      ></textarea>
    </div>

    <div class="pt-4 flex justify-end gap-3">
      <BaseButton type="button" variant="secondary" @click="emit('cancel')">Отмена</BaseButton>
      <BaseButton type="submit" variant="primary">Сохранить изменения</BaseButton>
    </div>
  </form>
</template>
