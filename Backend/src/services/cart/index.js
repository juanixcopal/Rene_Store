import { cartData } from '../../data/index.js'

import makeProductsCartService from './products-cart.service.js'

const productsCartService = makeProductsCartService({ cartData })

const cartServices = {
  'products-cart': productsCartService
}

export default cartServices
