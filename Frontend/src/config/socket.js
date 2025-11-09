import { io } from 'socket.io-client'

let socket = null

export const initializeSocket = token => {
  if (socket && socket.connected) {
    return socket
  }

  socket = io(process.env.REACT_APP_API_BASE, {
    auth: { token }
  })

  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.close()
    socket = null
  }
}
