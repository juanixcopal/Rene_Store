import { useEffect, useState, useCallback } from 'react'
import { getOrCreateConversation, getConversationMessages } from '../../data/user-chat/get.js'
import { sendMessage as sendMessageAPI } from '../../data/user-chat/post.js'
import { initializeSocket, disconnectSocket } from '../../config/socket'
import ExecutionPermit from '../../helpers/execution-permit-helper'

export const useChatSocket = () => {
  const [socket, setSocket] = useState(null)
  const [conversationId, setConversationId] = useState(null)
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initChat = async () => {
      try {
        const token = localStorage.getItem('token')

        if (!token) {
          console.error('No hay token disponible')
          setIsLoading(false)
          return
        }

        const socketInstance = initializeSocket(token)
        setSocket(socketInstance)

        const response = await getOrCreateConversation()
        const convId = response.data.data._id
        setConversationId(convId)

        const messagesResponse = await getConversationMessages(convId)
        setMessages(messagesResponse.data.data || [])

        socketInstance.emit('join-conversation', convId)

        setIsLoading(false)
      } catch (error) {
        console.error('Error al inicializar chat:', error)
        ExecutionPermit({ response: error.response })
        setIsLoading(false)
      }
    }

    initChat()

    return () => {
      disconnectSocket()
    }
  }, [])

  useEffect(() => {
    if (!socket) return

    socket.on('connect', () => {
      setIsConnected(true)
      // console.log('Socket conectado')
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
      // console.log('Socket desconectado')
    })

    socket.on('new-message', data => {
      setMessages(prev => [...prev, data.message])
    })

    socket.on('user-typing', () => {
      setIsTyping(true)
    })

    socket.on('user-stop-typing', () => {
      setIsTyping(false)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('new-message')
      socket.off('user-typing')
      socket.off('user-stop-typing')
    }
  }, [socket])

  const sendMessage = useCallback(
    async content => {
      if (!conversationId || !content.trim()) return

      try {
        const { data } = await sendMessageAPI(conversationId, content)
        return data
      } catch (error) {
        console.error('Error al enviar mensaje:', error)
        ExecutionPermit({ response: error.response })
      }
    },
    [conversationId]
  )

  const emitTyping = useCallback(() => {
    if (socket && conversationId) {
      socket.emit('typing', { conversationId })
    }
  }, [socket, conversationId])

  const emitStopTyping = useCallback(() => {
    if (socket && conversationId) {
      socket.emit('stop-typing', { conversationId })
    }
  }, [socket, conversationId])

  return {
    conversationId,
    messages,
    isTyping,
    isConnected,
    isLoading,
    sendMessage,
    emitTyping,
    emitStopTyping
  }
}

export const useFetchInitChats = () => {
  const chatSocket = useChatSocket()

  return {
    chatSocket
  }
}
