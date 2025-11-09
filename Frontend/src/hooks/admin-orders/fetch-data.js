import { useEffect, useState } from 'react'
import { getAllOrders } from '../../data/admin-orders/get'
import ExecutionPermit from '../../helpers/execution-permit-helper'

export const useFetchAllOrders = () => {
  const [allOrders, setAllOrders] = useState([])

  useEffect(() => {
    ;(async () => {
      await getAllOrders()
        .then(({ data }) => {
          setAllOrders(data)
        })
        .catch(({ response }) => {
          ExecutionPermit({ response })
        })
    })()
  }, [])

  return { allOrders }
}
