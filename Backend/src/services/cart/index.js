import { cartData } from '../../data/index.js'

import makeProductsCartService from './products-cart.service.js'
import makeDecreaseProductService from './decrease-product.service.js'
import makeCartSummaryService from './cart-summary.service.js'
import makeBuyCartService from './buy-cart.service.js'

const productsCartService = makeProductsCartService({ cartData })
const decreaseProductService = makeDecreaseProductService({ cartData })
const cartSummaryService = makeCartSummaryService({ cartData })
const buyCartService = makeBuyCartService({ cartData })

const cartServices = {
  'products-cart': productsCartService,
  'decrease-product': decreaseProductService,
  'cart-summary': cartSummaryService,
  'buy-cart': buyCartService
}

export default cartServices
