import { Router } from 'express'
import routerCallback from './router-callback.js'

import {
  ValidationMiddleware,
  JwtMiddleware,
  ServiceSelectMiddleware
} from '../middlewares/index.js'

import { cartController } from '../controllers/index.js'

const router = Router()

export default () => {
  router.get(
    '/query',
    [ValidationMiddleware, ServiceSelectMiddleware, JwtMiddleware],
    (request, response) => {
      const { service } = request.headers
      const moduleKey = service
      routerCallback({ request, response, moduleKey, controller: cartController })
    }
  )

  router.post(
    '/decrease/:idProduct',
    [ValidationMiddleware, ServiceSelectMiddleware, JwtMiddleware],
    (request, response) => {
      const moduleKey = 'decrease-product'
      routerCallback({ request, response, moduleKey, controller: cartController })
    }
  )

  router.post(
    '/buy',
    [ValidationMiddleware, ServiceSelectMiddleware, JwtMiddleware],
    (request, response) => {
      const moduleKey = 'buy-cart'
      routerCallback({ request, response, moduleKey, controller: cartController })
    }
  )

  return router
}
