import { Router } from 'express'
import routerCallback from './router-callback.js'

import { ValidationMiddleware, JwtMiddleware } from '../middlewares/index.js'

import { chatController } from '../controllers/index.js'

const router = Router()

export default () => {
  // Crear o obtener conversación
  router.post('/conversation', [ValidationMiddleware, JwtMiddleware], (request, response) => {
    const moduleKey = 'get-or-create-conversation'
    routerCallback({ request, response, moduleKey, controller: chatController })
  })

  // Obtener conversaciones del usuario
  router.get('/conversations', [ValidationMiddleware, JwtMiddleware], (request, response) => {
    const moduleKey = 'user-conversations'
    routerCallback({ request, response, moduleKey, controller: chatController })
  })

  // Obtener todas las conversaciones (solo admin)
  router.get('/conversations/all', [ValidationMiddleware, JwtMiddleware], (request, response) => {
    const moduleKey = 'all-conversations'
    routerCallback({ request, response, moduleKey, controller: chatController })
  })

  // Enviar mensaje
  router.post('/message', [ValidationMiddleware, JwtMiddleware], (request, response) => {
    const moduleKey = 'send-message'
    routerCallback({ request, response, moduleKey, controller: chatController })
  })

  // Obtener mensajes de una conversación
  router.get(
    '/messages/:conversationId',
    [ValidationMiddleware, JwtMiddleware],
    (request, response) => {
      const moduleKey = 'conversation-messages'
      routerCallback({ request, response, moduleKey, controller: chatController })
    }
  )

  // Marcar mensajes como leídos
  router.put(
    '/messages/:conversationId/read',
    [ValidationMiddleware, JwtMiddleware],
    (request, response) => {
      const moduleKey = 'mark-as-read'
      routerCallback({ request, response, moduleKey, controller: chatController })
    }
  )

  // Obtener cantidad de mensajes no leídos
  router.get('/unread-count', [ValidationMiddleware, JwtMiddleware], (request, response) => {
    const moduleKey = 'unread-count'
    routerCallback({ request, response, moduleKey, controller: chatController })
  })

  return router
}
