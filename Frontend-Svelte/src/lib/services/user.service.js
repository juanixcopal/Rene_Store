import api from './api.js'

export const userService = {
  async getAllUsers() {
    const { data } = await api.get('/user/query', {
      headers: { service: 'all-user-users' },
    })
    return data
  },

  async getAllAdmins() {
    const { data } = await api.get('/user/query', {
      headers: { service: 'all-admin-users' },
    })
    return data
  },

  async create(payload) {
    const { data } = await api.post('/user/manager', payload, {
      headers: { service: 'create-user' },
    })
    return data
  },

  async update(payload) {
    const { data } = await api.put('/user/manager', payload, {
      headers: { service: 'edit-user' },
    })
    return data
  },
}
