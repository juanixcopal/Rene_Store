import { orderData } from '../../data/index.js'

import makeOrdersByUserService from './orders-by-user.service.js'
import makeAllOrdersService from './all-orders.service.js'

const ordersByUserService = makeOrdersByUserService({ orderData })
const allOrdersService = makeAllOrdersService({ orderData })

const orderService = {
  'orders-by-user': ordersByUserService,
  'all-orders': allOrdersService
}

export default orderService
