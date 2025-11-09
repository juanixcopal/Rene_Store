import helpersObject from '../helpers/index.js'

import userServices from '../services/user/index.js'
import rolServices from '../services/rol/index.js'
import categoryServices from '../services/category/index.js'
import productServices from '../services/product/index.js'
import cartServices from '../services/cart/index.js'
import dashboardServices from '../services/dashboard/index.js'
import orderService from '../services/order/index.js'
import chatServices from '../services/chat/index.js'

import makeUserController from './user.controller.js'
import makeRolController from './rol.controller.js'
import makeCategoryController from './category.controller.js'
import makeProductController from './product.controller.js'
import makeCartController from './cart.controller.js'
import makeDashboardController from './dashboard.controller.js'
import makeOrderController from './order.controller.js'
import makeChatController from './chat.controller.js'

const userController = makeUserController({ userServices, helpersObject })
const rolController = makeRolController({ rolServices })
const categoryController = makeCategoryController({ categoryServices })
const productController = makeProductController({ productServices })
const cartController = makeCartController({ cartServices })
const dashboardController = makeDashboardController({ dashboardServices })
const orderController = makeOrderController({ orderService })
const chatController = makeChatController({ chatServices })

export {
  userController,
  rolController,
  categoryController,
  productController,
  cartController,
  dashboardController,
  orderController,
  chatController
}
