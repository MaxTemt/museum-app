import { ref } from 'vue'
import type { Event } from '../types'

const STORAGE_KEY = 'museum_events'

const initialEvents: Event[] = [
  {
    id: '1',
    title: 'Выставка египетских мумий',
    description: 'Уникальная возможность увидеть артефакты древней цивилизации.',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '2026-12-31',
    location: 'Зал А',
    status: 'active'
  },
  {
    id: '2',
    title: 'Лекция по истории искусств',
    description: 'Вступление в основы ренессанса.',
    startDate: '2026-05-01',
    endDate: '2026-05-02',
    location: 'Аудитория 101',
    status: 'planned'
  }
]

const events = ref<Event[]>([])
const isLoading = ref(false)

export function useEvents() {
  const loadFromStorage = () => {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      events.value = JSON.parse(data)
    } else {
      events.value = initialEvents
      saveToStorage()
    }
  }

  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events.value))
  }

  const fetchEvents = async () => {
    isLoading.value = true
    try {
      loadFromStorage()
    } finally {
      isLoading.value = false
    }
  }

  const addEvent = async (event: Omit<Event, 'id'>) => {
    isLoading.value = true
    try {
      const newEvent = {
        ...event,
        id: Date.now().toString()
      }
      events.value.push(newEvent)
      saveToStorage()
    } finally {
      isLoading.value = false
    }
  }

  const updateEvent = async (id: string, updatedData: Partial<Event>) => {
    isLoading.value = true
    try {
      const index = events.value.findIndex(e => e.id === id)
      if (index !== -1) {
        events.value[index] = { ...events.value[index], ...updatedData }
        saveToStorage()
      }
    } finally {
      isLoading.value = false
    }
  }

  const deleteEvent = async (id: string) => {
    isLoading.value = true
    try {
      events.value = events.value.filter(e => e.id !== id)
      saveToStorage()
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
