import api from './api.js'

export const authService = {
  async login(email, password) {
    const { data } = await api.post('/user/login', { email, password })
    return data  // { token, redirect }
  },

  async register(payload) {
    const { data } = await api.post('/user/register', payload)
    return data
  },
}
