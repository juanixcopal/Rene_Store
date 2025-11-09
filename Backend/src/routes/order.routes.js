import { Router } from 'express'
import routerCallback from './router-callback.js'

import {
  ValidationMiddleware,
  JwtMiddleware,
  RolMiddleware,
  ServiceSelectMiddleware
} from '../middlewares/index.js'

import { orderController } from '../controllers/index.js'

const router = Router()

export default () => {
  router.get(
    '/query',
    [ValidationMiddleware, ServiceSelectMiddleware, JwtMiddleware],
    (request, response) => {
      const { service } = request.headers
      const moduleKey = service
      routerCallback({ request, response, moduleKey, controller: orderController })
    }
  )

  return router
}
