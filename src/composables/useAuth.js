import { ref, watchEffect } from 'vue'
import axiosInstance from '@/axiosconfig/axiosInstance'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'

export default function useAuth() {
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const router = useRouter()
  const errorMessage = ref('')
  const authError = ref('')

  const accessToken = useLocalStorage('access-token', null)
  const refreshToken = useLocalStorage('refresh-token', null)

  // ✅ Check if the access token is expired
  const isTokenExpired = (token) => {
    if (!token) return true
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp * 1000 < Date.now()
    } catch (e) {
      console.warn('Invalid token or decoding error:', e)
      return true // token is malformed or invalid
    }
  }

  // ✅ Automatically clear expired token on load
  watchEffect(() => {
    if (accessToken.value && isTokenExpired(accessToken.value)) {
      console.warn('Access token expired, clearing storage...')
      accessToken.value = null
      refreshToken.value = null
      delete axiosInstance.defaults.headers.common['Authorization']
      router.push('/login')
    } else if (accessToken.value) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken.value}`
    }
  })

  const login = async () => {
    errorMessage.value = ''
    try {
      const response = await axiosInstance.post('/api/login/', {
        email: email.value,
        password: password.value,
      })

      accessToken.value = response.data.access_token
      refreshToken.value = response.data.refresh_token

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken.value}`
      router.push('/')
    } catch (error) {
      console.error(error)
      errorMessage.value =
        error.response?.data?.detail || 'Login failed. Please check your credentials.'
    }
  }

  const signup = async () => {
    authError.value = ''
    try {
      const response = await axiosInstance.post('/api/register/', {
        name: name.value,
        email: email.value,
        password: password.value,
      })

      accessToken.value = response.data.access_token
      refreshToken.value = response.data.refresh_token

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken.value}`
      router.push('/')
    } catch (error) {
      console.error(error)
      authError.value =
        error.response?.data?.detail || 'Signup failed. Please check your details and try again.'
    }
  }

  const logout = async () => {
    try {
      await axiosInstance.post('/api/logout/', {
        refresh: refreshToken.value,
      })

      accessToken.value = null
      refreshToken.value = null
      delete axiosInstance.defaults.headers.common['Authorization']
      router.push('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return {
    name,
    email,
    password,
    login,
    signup,
    logout,
    accessToken,
    refreshToken,
    authError,
    errorMessage,
  }
}
