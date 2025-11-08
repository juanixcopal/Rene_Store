import { Router } from 'express'
import routerCallback from './router-callback.js'

import {
  ValidationMiddleware,
  JwtMiddleware,
  RolMiddleware,
  ServiceSelectMiddleware
} from '../middlewares/index.js'

import { dashboardController } from '../controllers/index.js'

const router = Router()

export default () => {
  router.get(
    '/query',
    [ValidationMiddleware, ServiceSelectMiddleware, JwtMiddleware, RolMiddleware],
    (request, response) => {
      const { service } = request.headers
      const moduleKey = service
      routerCallback({ request, response, moduleKey, controller: dashboardController })
    }
  )

  return router
}
