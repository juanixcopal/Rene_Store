import express from 'express'
import config from '../config/env.js'
import router from '../routes/index.routes.js'
import http from 'http'
import { initializeSocket } from '../config/socket.config.js'
import { createApolloServer } from '../graphql/index.js'

process.setMaxListeners(500)
const { SERVER_PORT, SERVER_HOST } = config

const start = async () => {
  const _express = express()

  // 🔹 Inicializar GraphQL ANTES del router
  const apolloServer = createApolloServer()
  await apolloServer.start()

  apolloServer.applyMiddleware({
    app: _express,
    path: '/graphql',
    cors: true
  })

  // 🔹 Ahora sí aplicar el router (después de GraphQL)
  _express.use(router({ config }))

  const server = http.createServer(_express)

  // 🔹 Inicializar Socket.io
  initializeSocket(server)

  return new Promise(resolve => {
    server.listen(SERVER_PORT, SERVER_HOST, () => {
      console.log('Server running on port:', SERVER_PORT)
      console.log('Server running on host:', SERVER_HOST)
      console.log(`GraphQL endpoint: http://${SERVER_HOST}:${SERVER_PORT}/graphql`)
      resolve()
    })
  })
}

start()
