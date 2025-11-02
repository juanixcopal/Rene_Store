import { Router } from 'express'
import routerCallback from './router-callback.js'

import { ValidationMiddleware, JwtMiddleware, RolMiddleware, ServiceSelectMiddleware } from '../middlewares/index.js'

import {userController} from '../controllers/index.js'

const router = Router()

export default () => {
    router.post('/login', [ValidationMiddleware, ServiceSelectMiddleware], (request, response) => {
      const moduleKey = 'login'
      routerCallback({ request, response, moduleKey, controller: userController })
    })

    router.post('/manager', [ValidationMiddleware, ServiceSelectMiddleware, JwtMiddleware, RolMiddleware], (request, response) => {
        const { service } = request.headers
        const moduleKey = service
        routerCallback({ request, response, moduleKey, controller: userController })
      }
    )

    router.get('/query', [ValidationMiddleware, ServiceSelectMiddleware, JwtMiddleware], (request, response) => {
      const { service } = request.headers
        const moduleKey = service
      routerCallback({ request, response, moduleKey, controller: userController })
    })

    return router
}