import { instanceAPIRenielStore } from '../../config/data-source'

export const getAllOrders = async () => {
  return await instanceAPIRenielStore.get('/order/manager', {
    headers: {
      service: 'all-orders'
    }
  })
}
