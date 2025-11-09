import { useFetchAllOrders } from './fetch-data'

export const useFetchInitAdminOrders = () => {
  const fetchAllOrders = useFetchAllOrders()

  return {
    fetchAllOrders
  }
}
