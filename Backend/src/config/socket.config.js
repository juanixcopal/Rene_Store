import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'

let io

export const initializeSocket = server => {
  io = new Server(server, {
    cors: {
      origin: '*',
      credentials: true
    }
  })

  io.use((socket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.headers.token

    if (!token) {
      return next(new Error('Authentication error: No token provided'))
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      socket.userId = decoded.id
      socket.userRole = decoded.rol
      socket.userName = decoded.user_name
      socket.userLastname = decoded.user_lastname
      socket.userEmail = decoded.email

      socket.user = {
        id: decoded.id,
        rol: decoded.rol,
        nombre: decoded.user_name,
        apellido: decoded.user_lastname,
        email: decoded.email
      }

      next()
    } catch (error) {
      console.error('Socket auth error:', error)
      next(new Error('Authentication error: Invalid token'))
    }
  })

  io.on('connection', socket => {
    socket.join(`user:${socket.userId}`)

    socket.on('disconnect', () => {})

    socket.on('join-conversation', conversationId => {
      socket.join(`conversation:${conversationId}`)
    })

    socket.on('leave-conversation', conversationId => {
      socket.leave(`conversation:${conversationId}`)
      console.log(`Usuario ${socket.userId} salió de conversación ${conversationId}`)
    })

    socket.on('typing', ({ conversationId }) => {
      socket.to(`conversation:${conversationId}`).emit('user-typing', {
        userId: socket.userId,
        conversationId
      })
    })

    socket.on('stop-typing', ({ conversationId }) => {
      socket.to(`conversation:${conversationId}`).emit('user-stop-typing', {
        userId: socket.userId,
        conversationId
      })
    })
  })

  return io
}

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io no está inicializado')
  }
  return io
}

export const emitToConversation = (conversationId, event, data) => {
  const io = getIO()
  io.to(`conversation:${conversationId}`).emit(event, data)
}

export const emitToUser = (userId, event, data) => {
  const io = getIO()
  io.to(`user:${userId}`).emit(event, data)
}
