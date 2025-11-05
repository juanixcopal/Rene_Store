import { Router } from 'express'
import routerCallback from './router-callback.js'

import {
  ValidationMiddleware,
  JwtMiddleware,
  RolMiddleware,
  ServiceSelectMiddleware
} from '../middlewares/index.js'

import { rolController } from '../controllers/index.js'

const router = Router()

export default () => {
  router.post(
    '/create',
    [ValidationMiddleware, ServiceSelectMiddleware, JwtMiddleware, RolMiddleware],
    (request, response) => {
      const moduleKey = 'create-rol'
      routerCallback({ request, response, moduleKey, controller: rolController })
    }
  )

  router.get(
    '/query',
    [ValidationMiddleware, ServiceSelectMiddleware, JwtMiddleware],
    (request, response) => {
      const { service } = request.headers
      const moduleKey = service
      routerCallback({ request, response, moduleKey, controller: rolController })
    }
  )

  return router
}
