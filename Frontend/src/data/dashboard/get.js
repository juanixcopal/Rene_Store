import { instanceAPIRenielStore } from '../../config/data-source'

export const getDashboardStats = async () => {
  return await instanceAPIRenielStore.get('/dashboard/query', {
    headers: {
      service: 'dashboard-stats'
    }
  })
}

export const getLastOrders = async () => {
  return await instanceAPIRenielStore.get('/dashboard/query', {
    headers: {
      service: 'last-orders'
    }
  })
}
