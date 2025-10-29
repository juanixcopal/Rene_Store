import express from 'express'
import config from '../config/env.js'
import router from '../routes/index.routes.js'
import http from 'http'

process.setMaxListeners(500)
const { SERVER_PORT, SERVER_HOST } = config

const start = () => {
  const _express = express().use(router({ config }))

  const server = http.createServer(_express)

  return new Promise(resolve => {
    server.listen(SERVER_PORT, SERVER_HOST, () => {
      console.log('Server running on port:', SERVER_PORT)
      console.log('Server running on host:', SERVER_HOST)
      resolve()
    })
  })
}

start()
