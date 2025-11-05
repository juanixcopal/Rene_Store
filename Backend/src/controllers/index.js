import helpersObject from '../helpers/index.js'

import userServices from '../services/user/index.js'
import rolServices from '../services/rol/index.js'
import categoryServices from '../services/category/index.js'
import productServices from '../services/product/index.js'

import makeUserController from './user.controller.js'
import makeRolController from './rol.controller.js'
import makeCategoryController from './category.controller.js'
import makeProductController from './product.controller.js'

const userController = makeUserController({ userServices, helpersObject })
const rolController = makeRolController({ rolServices })
const categoryController = makeCategoryController({ categoryServices })
const productController = makeProductController({ productServices })

export { userController, rolController, categoryController, productController }
