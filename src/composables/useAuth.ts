import { ref, computed } from 'vue'

const AUTH_KEY = 'museum_auth_user'

export function useAuth() {
  const user = ref<string | null>(localStorage.getItem(AUTH_KEY))
  const isAuthenticated = computed(() => !!user.value)

  const login = async (username: string) => {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 800))
    user.value = username
    localStorage.setItem(AUTH_KEY, username)
    return true
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem(AUTH_KEY)
  }

  const register = async (username: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    user.value = username
    localStorage.setItem(AUTH_KEY, username)
    return true
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    register
  }
}
