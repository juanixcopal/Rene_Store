import { instanceAPIRenielStore } from '../../config/data-source'

export const getProductsForWoman = async params => {
    return await instanceAPIRenielStore.get('/product/query/Mujer', {
      params,
      headers: {
        service: 'product-for-gender'
      }
    })
}