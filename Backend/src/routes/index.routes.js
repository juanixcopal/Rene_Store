import { Router, json, urlencoded } from 'express'

import cors from 'cors'
import helmet from 'helmet'
import 'express-async-errors'
import compression from 'compression'
import timeout from 'connect-timeout'

import { NotFoundMiddleware, ErrorMiddleware } from '../middlewares/index.js'

import {userRoutes, rolRoutes} from './index.js'

export default ({ config }) => {
    const { SERVER_TIMEOUT } = config
    const router = Router()
    const apiRoutes = Router()
  
    apiRoutes
      .use(json())
      .use(cors())
      .use(helmet())
      .use(compression())
      .use(urlencoded({ extended: true }))
      .use(timeout(SERVER_TIMEOUT))
  
    apiRoutes.use('/user', userRoutes())
    apiRoutes.use('/rol', rolRoutes())
  
    router.use('/renielStore', apiRoutes)
    router.use(NotFoundMiddleware)
    router.use(ErrorMiddleware)
  
    return router
  }
  