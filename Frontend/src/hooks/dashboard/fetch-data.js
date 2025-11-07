import { useState, useEffect } from 'react'
import { getDashboardStats, getLastOrders } from '../../data/dashboard/get.js'
import ExecutionPermit from '../../helpers/execution-permit-helper.js'

export const useFetchDashboardStats = () => {
  const [stats, setStats] = useState()

  useEffect(() => {
    ;(async () => {
      await getDashboardStats()
        .then(({ data }) => {
          setStats(data)
        })
        .catch(({ response }) => {
          ExecutionPermit({ response })
        })
    })()
  }, [])

  return { stats }
}

export const useFetchLastOrders = () => {
  const [lastOrders, setLastOrders] = useState([])

  useEffect(() => {
    ;(async () => {
      await getLastOrders()
        .then(({ data }) => {
          setLastOrders(data)
        })
        .catch(({ response }) => {
          ExecutionPermit({ response })
        })
    })()
  }, [])

  return { lastOrders }
}
