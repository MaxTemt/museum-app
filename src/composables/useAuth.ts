import { ref, computed } from 'vue'

const AUTH_KEY = 'museum_auth_user'

// База данных разрешенных пользователей (Курсовой проект)
const VALID_USERS = [
  { username: 'admin', password: '123', role: 'Администратор' },
  { username: 'museum_dir', password: 'root', role: 'Директор' },
  { username: 'manager', password: 'qwe', role: 'Менеджер фондов' }
]

// Глобальное состояние (Singleton) - вынесено за пределы функции для синхронизации всех компонентов
const user = ref<string | null>(localStorage.getItem(AUTH_KEY))
const userRole = ref<string | null>(localStorage.getItem(AUTH_KEY + '_role'))
const isAuthenticated = computed(() => !!user.value)

export function useAuth() {
  const login = async (username: string, password?: string) => {
    isLoading.value = true
    error.value = ''
    
    // Имитация сетевой задержки
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Проверка учетных данных по "базе данных"
    const foundUser = VALID_USERS.find(u => u.username === username && u.password === password)
    
    if (foundUser) {
      user.value = foundUser.username
      userRole.value = foundUser.role
      localStorage.setItem(AUTH_KEY, foundUser.username)
      localStorage.setItem(AUTH_KEY + '_role', foundUser.role)
      isLoading.value = false
      return true
    } else {
      isLoading.value = false
      throw new Error('Неверный логин или пароль')
    }
  }

  const logout = () => {
    user.value = null
    userRole.value = null
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(AUTH_KEY + '_role')
  }

  const isLoading = ref(false)
  const error = ref('')

  return {
    user,
    userRole,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout
  }
}
