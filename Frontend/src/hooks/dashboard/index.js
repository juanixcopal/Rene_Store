import { useFetchDashboardStats, useFetchLastOrders } from './fetch-data.js'

export const useFetchDashboard = () => {
  const fetchDashboardStats = useFetchDashboardStats()
  const fetchLastOrders = useFetchLastOrders()

  return {
    fetchDashboardStats,
    fetchLastOrders
  }
}
