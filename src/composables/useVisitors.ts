import { ref, computed } from 'vue'
import type { Visitor } from '../types'
const visitors = ref<Visitor[]>([])
const isLoading = ref(false)
const API_URL = 'http://localhost:3000/api/visitors'
export function useVisitors() {
  const fetchVisitors = async () => {
    isLoading.value = true
    try {
      const res = await fetch(API_URL)
      visitors.value = await res.json()
    } finally {
      isLoading.value = false
    }
  }
  const addVisitor = async (visitor: Omit<Visitor, 'id' | 'status'>) => {
    isLoading.value = true
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitor)
      })
      const newVisitor = await res.json()
      visitors.value.push(newVisitor)
    } finally {
      isLoading.value = false
    }
  }
  const cancelTicket = async (id: string) => {
    isLoading.value = true
    try {
      await fetch(`${API_URL}/${id}/cancel`, { method: 'PATCH' })
      const index = visitors.value.findIndex(v => v.id === id)
      if (index !== -1) {
        visitors.value[index].status = 'cancelled'
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
    fetchVisitors,
    addVisitor,
    cancelTicket,
    activeVisitorsToday
  }
}
