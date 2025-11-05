import { instanceAPIRenielStore } from '../../config/data-source'

export const getProductsDetails = async ({ idProduct }) => {
  return await instanceAPIRenielStore.get(`/product/query/${idProduct}`, {
    headers: {
      service: 'product-by-id'
    }
  })
}
