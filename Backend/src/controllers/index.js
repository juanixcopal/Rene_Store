import helpersObject from '../helpers/index.js'

import userServices from '../services/user/index.js'
import rolServices from '../services/rol/index.js'
import categoryServices from '../services/category/index.js'
import productServices from '../services/product/index.js'
import cartServices from '../services/cart/index.js'

import makeUserController from './user.controller.js'
import makeRolController from './rol.controller.js'
import makeCategoryController from './category.controller.js'
import makeProductController from './product.controller.js'
import makeCartController from './cart.controller.js'

const userController = makeUserController({ userServices, helpersObject })
const rolController = makeRolController({ rolServices })
const categoryController = makeCategoryController({ categoryServices })
const productController = makeProductController({ productServices })
const cartController = makeCartController({ cartServices })

export { userController, rolController, categoryController, productController, cartController }
