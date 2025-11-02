import { Router } from 'express'
import routerCallback from './router-callback.js'

import { ValidationMiddleware, JwtMiddleware, RolMiddleware, ServiceSelectMiddleware, uploadMiddleware } from '../middlewares/index.js'

import {productController} from '../controllers/index.js'

const router = Router()

export default () => {
  router.post('/create', [ValidationMiddleware, ServiceSelectMiddleware, JwtMiddleware, RolMiddleware, uploadMiddleware.single('image')], (request, response) => {
    const moduleKey = 'create-product'
    routerCallback({ request, response, moduleKey, controller: productController })
  })

  router.get('/query', [ValidationMiddleware, ServiceSelectMiddleware, JwtMiddleware], (request, response) => {
    const { service } = request.headers
    const moduleKey = service
    routerCallback({ request, response, moduleKey, controller: productController })
  })

  router.get('/query/:id', [ValidationMiddleware, ServiceSelectMiddleware, JwtMiddleware], (request, response) => {
    const { service } = request.headers
    const moduleKey = service
    routerCallback({ request, response, moduleKey, controller: productController })
  })

    return router
}