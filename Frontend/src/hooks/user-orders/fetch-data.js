import { useEffect, useState } from 'react'
import { getOrdersByUser } from '../../data/user-orders/get.js'
import ExecutionPermit from '../../helpers/execution-permit-helper.js'

export const useFetchOrdersByUser = () => {
  const [userOrders, setUserOrders] = useState([])

  useEffect(() => {
    ;(async () => {
      await getOrdersByUser()
        .then(({ data }) => {
          setUserOrders(data)
        })
        .catch(({ response }) => {
          ExecutionPermit({ response })
        })
    })()
  }, [])

  return { userOrders }
}
