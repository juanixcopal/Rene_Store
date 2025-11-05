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

  return router
}
