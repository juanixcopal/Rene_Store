import api from './api.js'

export const categoryService = {
  async getAll() {
    const { data } = await api.get('/category/query', {
      headers: { service: 'all-categories' },
    })
    return data
  },
}
