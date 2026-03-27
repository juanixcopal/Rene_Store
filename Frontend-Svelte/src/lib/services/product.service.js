import api from './api.js'

export const productService = {
  async getAll() {
    const { data } = await api.get('/product/query', {
      headers: { service: 'all-product' },
    })
    return data
  },

  async getById(id) {
    const { data } = await api.get(`/product/query/${id}`, {
      headers: { service: 'product-by-id' },
    })
    return data
  },

  async getByGenderCategory(gender, category) {
    const { data } = await api.get(`/product/query/${gender}/${category}`, {
      headers: { service: 'product-by-gender-category' },
    })
    return data
  },

  async create(formData) {
    const { data } = await api.post('/product/manager', formData, {
      headers: { service: 'create-product', 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  async update(id, formData) {
    const { data } = await api.put(`/product/manager/${id}`, formData, {
      headers: { service: 'edit-product', 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  async delete(id) {
    const { data } = await api.delete(`/product/manager/${id}`, {
      headers: { service: 'delete-product' },
    })
    return data
  },
}
