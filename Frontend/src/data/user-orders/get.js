import { instanceAPIRenielStore } from '../../config/data-source'

export const getOrdersByUser = async () => {
  return await instanceAPIRenielStore.get('/order/query', {
    headers: {
      service: 'orders-by-user'
    }
  })
}
