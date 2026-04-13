// Импорт функций реактивности для Composition API
import { ref, computed } from 'vue'
// Импорт TypeScript-интерфейса Экспоната
import type { Exhibit } from '../types'
// Глобальные реактивные переменные состояния
const exhibits = ref<Exhibit[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const API_URL = 'http://localhost:3000/api/exhibits'

// Основная функция-композиция для управления экспонатами (паттерн Store)
export function useExhibits() {
  // Асинхронная загрузка списка экспонатов с сервера
  const fetchExhibits = async () => {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch(API_URL)
      exhibits.value = await res.json()
    } catch (e) {
      error.value = 'Ошибка загрузки экспонатов'
    } finally {
      isLoading.value = false
    }
  }
  const getExhibitById = async (id: string): Promise<Exhibit | undefined> => {
    try {
      const res = await fetch(`${API_URL}/${id}`)
      if (res.ok) return await res.json()
    } catch (e) {
      console.error(e)
    }
    return undefined
  }
  // Добавление нового экспоната в базу данных
  const addExhibit = async (exhibit: Omit<Exhibit, 'id'>) => {
    isLoading.value = true
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exhibit)
      })
      const newExhibit = await res.json()
      exhibits.value.push(newExhibit)
    } finally {
      isLoading.value = false
    }
  }
  // Изменение данных существующего экспоната
  const updateExhibit = async (id: string, updatedData: Partial<Exhibit>) => {
    isLoading.value = true
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      })
      const data = await res.json()
      const index = exhibits.value.findIndex(e => e.id === id)
      if (index !== -1) {
        exhibits.value[index] = data
      }
    } finally {
      isLoading.value = false
    }
  }
  // Удаление экспоната
  const deleteExhibit = async (id: string) => {
    isLoading.value = true
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      exhibits.value = exhibits.value.filter(e => e.id !== id)
    } finally {
      isLoading.value = false
    }
  }
  // Вычисляемое свойство - общее количество экспонатов
  const totalExhibits = computed(() => exhibits.value.length)
  
  // Возврат методов и переменных для использования в компонентах
  return {
    exhibits,
    isLoading,
    error,
    fetchExhibits,
    getExhibitById,
    addExhibit,
    updateExhibit,
    deleteExhibit,
    totalExhibits
  }
}
