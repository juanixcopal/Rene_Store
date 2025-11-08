import { instanceAPIRenielStore } from '../../config/data-source'

export const getAllProducts = async () => {
  return await instanceAPIRenielStore.get('/product/manager', {
    headers: {
      service: 'all-product'
    }
  })
}

export const getAllCategories = async () => {
  return await instanceAPIRenielStore.get('/category/query', {
    headers: {
      service: 'all-categories'
    }
  })
}
