import { orderData } from '../../data/index.js'

import makeOrdersByUser from './orders-by-user.js'

const ordersByUser = makeOrdersByUser({ orderData })

const orderService = {
  'orders-by-user': ordersByUser
}

export default orderService
