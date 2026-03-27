// Instancia base de Axios — inyecta el token automáticamente
import axios from 'axios'
import { auth } from '../stores/auth.svelte.js'
import { toastStore } from '../stores/toast.svelte.js'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE ?? 'http://localhost:3050/api',
  timeout: 15000,
})

// Interceptor: agrega el token JWT en cada request
api.interceptors.request.use(config => {
  if (auth.token) config.headers['token'] = auth.token
  return config
})

// Interceptor: manejo global de errores HTTP
api.interceptors.response.use(
  res => res,
  err => {
    const status = err.response?.status

    if (status === 401) {
      auth.logout()
      // El $effect en App.svelte redirige al login automáticamente
    } else if (status === 403) {
      toastStore.error('No tienes permiso para realizar esta acción')
    } else if (status >= 500) {
      toastStore.error('Error del servidor. Intenta de nuevo más tarde')
    } else if (!err.response && err.code === 'ERR_NETWORK') {
      toastStore.error('Sin conexión con el servidor')
    }

    return Promise.reject(err)
  }
)

export default api
