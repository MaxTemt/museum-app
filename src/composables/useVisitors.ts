import { ref, computed } from 'vue'
import type { Visitor } from '../types'

const STORAGE_KEY = 'museum_visitors'

const initialVisitors: Visitor[] = [
  {
    id: '1',
    name: 'Иван Иванов',
    visitDate: new Date().toISOString().split('T')[0],
    ticketType: 'standard',
    status: 'active'
  },
  {
    id: '2',
    name: 'Мария Петрова',
    visitDate: new Date().toISOString().split('T')[0],
    ticketType: 'vip',
    status: 'active'
  }
]

const visitors = ref<Visitor[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

export function useVisitors() {
  const loadFromStorage = () => {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      visitors.value = JSON.parse(data)
    } else {
      visitors.value = initialVisitors
      saveToStorage()
    }
  }

  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visitors.value))
  }

  const fetchVisitors = async () => {
    isLoading.value = true
    try {
      loadFromStorage()
    } finally {
      isLoading.value = false
    }
  }

  const addVisitor = async (visitor: Omit<Visitor, 'id' | 'status'>) => {
    isLoading.value = true
    try {
      const newVisitor: Visitor = {
        ...visitor,
        id: Date.now().toString(),
        status: 'active'
      }
      visitors.value.push(newVisitor)
      saveToStorage()
    } finally {
      isLoading.value = false
    }
  }

  const cancelTicket = async (id: string) => {
    isLoading.value = true
    try {
      const index = visitors.value.findIndex(v => v.id === id)
      if (index !== -1) {
        visitors.value[index].status = 'cancelled'
        saveToStorage()
      }
    } finally {
      isLoading.value = false
    }
  }

  const activeVisitorsToday = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return visitors.value.filter(v => v.visitDate === today && v.status === 'active').length
  })

  return {
    visitors,
    isLoading,
    error,
    fetchVisitors,
    addVisitor,
    cancelTicket,
    activeVisitorsToday
  }
}
