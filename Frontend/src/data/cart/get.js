import { instanceAPIRenielStore } from '../../config/data-source'

export const getProductsInCart = async () => {
  return await instanceAPIRenielStore.get('/cart/query', {
    headers: {
      service: 'products-cart'
    }
  })
}
