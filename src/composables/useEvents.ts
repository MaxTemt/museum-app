import { ref } from 'vue'
import type { Event } from '../types'
const events = ref<Event[]>([])
const isLoading = ref(false)
const API_URL = 'http://localhost:3000/api/events'
export function useEvents() {
  const fetchEvents = async () => {
    isLoading.value = true
    try {
      const res = await fetch(API_URL)
      events.value = await res.json()
    } finally {
      isLoading.value = false
    }
  }
  const addEvent = async (event: Omit<Event, 'id'>) => {
    isLoading.value = true
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      })
      const newEvent = await res.json()
      events.value.push(newEvent)
    } finally {
      isLoading.value = false
    }
  }
  const updateEvent = async (id: string, updatedData: Partial<Event>) => {
    isLoading.value = true
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      })
      const data = await res.json()
      const index = events.value.findIndex(e => e.id === id)
      if (index !== -1) {
        events.value[index] = data
      }
    } finally {
      isLoading.value = false
    }
  }
  const deleteEvent = async (id: string) => {
    isLoading.value = true
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      events.value = events.value.filter(e => e.id !== id)
    } finally {
      isLoading.value = false
    }
  }
  const isEventActive = (event: Event) => {
    const today = new Date().toISOString().split('T')[0]
    return today >= event.startDate && today <= event.endDate
  }
  return {
    events,
    isLoading,
    addEvent,
    fetchEvents,
    updateEvent,
    deleteEvent,
    isEventActive
  }
}
