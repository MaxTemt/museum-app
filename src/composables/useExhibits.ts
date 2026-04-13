import { ref, computed } from 'vue'
import type { Exhibit } from '../types'

const STORAGE_KEY = 'museum_exhibits'

const initialExhibits: Exhibit[] = [
  {
    id: '1',
    name: 'Золотая маска Тутанхамона',
    description: 'Погребальная маска фараона Тутанхамона, один из самых известных символов Древнего Египта.',
    category: 'Археология',
    year: '1323 до н.э.',
    image: 'https://images.unsplash.com/photo-1599118580792-790fb0482015?w=800'
  },
  {
    id: '2',
    name: 'Венера Милосская',
    description: 'Древнегреческая скульптура, созданная приблизительно между 130 и 100 годами до н. э.',
    category: 'Скульптура',
    year: '100 до н.э.',
    image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800'
  }
]

const exhibits = ref<Exhibit[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

export function useExhibits() {
  const loadFromStorage = () => {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      exhibits.value = JSON.parse(data)
    } else {
      exhibits.value = initialExhibits
      saveToStorage()
    }
  }

  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(exhibits.value))
  }

  const fetchExhibits = async () => {
    isLoading.value = true
    try {
      loadFromStorage()
    } catch (e) {
      error.value = 'Ошибка загрузки экспонатов'
    } finally {
      isLoading.value = false
    }
  }

  const getExhibitById = async (id: string): Promise<Exhibit | undefined> => {
    loadFromStorage()
    return exhibits.value.find(e => e.id === id)
  }

  const addExhibit = async (exhibit: Omit<Exhibit, 'id'>) => {
    isLoading.value = true
    try {
      const newExhibit = {
        ...exhibit,
        id: Date.now().toString()
      }
      exhibits.value.push(newExhibit)
      saveToStorage()
    } finally {
      isLoading.value = false
    }
  }

  const updateExhibit = async (id: string, updatedData: Partial<Exhibit>) => {
    isLoading.value = true
    try {
      const index = exhibits.value.findIndex(e => e.id === id)
      if (index !== -1) {
        exhibits.value[index] = { ...exhibits.value[index], ...updatedData }
        saveToStorage()
      }
    } finally {
      isLoading.value = false
    }
  }

  const deleteExhibit = async (id: string) => {
    isLoading.value = true
    try {
      exhibits.value = exhibits.value.filter(e => e.id !== id)
      saveToStorage()
    } finally {
      isLoading.value = false
    }
  }

  const totalExhibits = computed(() => exhibits.value.length)

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
