import { useFetchOrdersByUser } from './fetch-data.js'

export const useFetchInitUserOrders = () => {
  const fetchOrdersByUser = useFetchOrdersByUser()

  return {
    fetchOrdersByUser
  }
}
