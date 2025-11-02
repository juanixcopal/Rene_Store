import { productData } from '../../data/index.js'

import makeCreateProductService from './create-product.service.js'
import makeAllProductService from './all-product.service.js'
import makeProductByIdService from './product-by-id.service.js'

const createProductService = makeCreateProductService({productData})
const allProductService = makeAllProductService({productData})
const productByIdService = makeProductByIdService({productData})

const productServices = {
    'create-product': createProductService,
    'all-product': allProductService,
    'product-by-id': productByIdService
}

export default productServices