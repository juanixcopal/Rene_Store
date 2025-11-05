import { productData } from '../../data/index.js'

import makeCreateProductService from './create-product.service.js'
import makeAllProductService from './all-product.service.js'
import makeProductByIdService from './product-by-id.service.js'
import makeProductMan5Service from './product-man-5.service.js'
import makeProductWoman5Service from './product-woman-5.service.js'
import makeProductForGenderService from './product-for-gender.js'
import makeProductByGenderCategory from './product-by-gender-category.service.js'
import makeAddToCartService from './add-to-cart.service.js'

const createProductService = makeCreateProductService({ productData })
const allProductService = makeAllProductService({ productData })
const productByIdService = makeProductByIdService({ productData })
const productMan5Service = makeProductMan5Service({ productData })
const productWoman5Service = makeProductWoman5Service({ productData })
const productForGenderService = makeProductForGenderService({ productData })
const productByGenderCategory = makeProductByGenderCategory({ productData })
const addToCartService = makeAddToCartService({ productData })

const productServices = {
  'create-product': createProductService,
  'all-product': allProductService,
  'product-by-id': productByIdService,
  '5-product-man': productMan5Service,
  '5-product-woman': productWoman5Service,
  'product-for-gender': productForGenderService,
  'product-by-gender-category': productByGenderCategory,
  'add-to-cart': addToCartService
}

export default productServices
