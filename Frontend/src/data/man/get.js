import { instanceAPIRenielStore } from '../../config/data-source'

export const getProductsForMen = async params => {
    return await instanceAPIRenielStore.get('/product/query', {
      params,
      headers: {
        service: 'product-for-man'
      }
    })
}