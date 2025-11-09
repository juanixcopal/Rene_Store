import { useEffect, useState, useCallback } from 'react'
import {
  getAllConversations,
  getConversationMessages,
  sendAdminMessage,
  markConversationAsRead
} from '../../data/admin-chat/admin.js'
import { initializeSocket, disconnectSocket } from '../../config/socket'
import ExecutionPermit from '../../helpers/execution-permit-helper'

export const useAdminChat = () => {
  const [socket, setSocket] = useState(null)
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [typingUsers, setTypingUsers] = useState({})
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [unreadCounts, setUnreadCounts] = useState({})

  useEffect(() => {
    const initAdminChat = async () => {
      try {
        const token = localStorage.getItem('token')

        if (!token) {
          setIsLoading(false)
          return
        }

        const socketInstance = initializeSocket(token)
        setSocket(socketInstance)

        const response = await getAllConversations()
        const conversationsData = response.data.data || []
        setConversations(conversationsData)

        const counts = {}
        conversationsData.forEach(conv => {
          counts[conv._id] = conv.unreadCount || 0
        })
        setUnreadCounts(counts)

        setIsLoading(false)
      } catch (error) {
        console.error('Error al inicializar chat admin:', error)
        ExecutionPermit({ response: error.response })
        setIsLoading(false)
      }
    }

    initAdminChat()

    return () => {
      disconnectSocket()
    }
  }, [])

  useEffect(() => {
    if (!socket) return

    socket.on('connect', () => {
      setIsConnected(true)
      console.log('Socket admin conectado')

      conversations.forEach(conv => {
        socket.emit('join-conversation', conv._id)
      })
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
      console.log('Socket admin desconectado')
    })

    socket.on('new-message', data => {
      const { message, conversationId } = data

      if (selectedConversation?._id === conversationId) {
        setMessages(prev => [...prev, message])
      }

      if (message.sender_id._id !== localStorage.getItem('userId')) {
        setUnreadCounts(prev => ({
          ...prev,
          [conversationId]: (prev[conversationId] || 0) + 1
        }))
      }

      setConversations(prev =>
        prev.map(conv =>
          conv._id === conversationId
            ? { ...conv, lastMessage: message, updatedAt: message.createdAt }
            : conv
        )
      )
    })

    socket.on('new-conversation', async () => {
      try {
        const response = await getAllConversations()
        console.log('Nueva conversación detectada:', response.data)
        setConversations(response.data.data || [])
      } catch (error) {
        console.error('Error al cargar nuevas conversaciones:', error)
      }
    })

    socket.on('user-typing', data => {
      setTypingUsers(prev => ({
        ...prev,
        [data.conversationId]: true
      }))
    })

    socket.on('user-stop-typing', data => {
      setTypingUsers(prev => ({
        ...prev,
        [data.conversationId]: false
      }))
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('new-message')
      socket.off('new-conversation')
      socket.off('user-typing')
      socket.off('user-stop-typing')
    }
  }, [socket, conversations, selectedConversation])

  const selectConversation = useCallback(
    async conversation => {
      try {
        setSelectedConversation(conversation)

        const response = await getConversationMessages(conversation._id)
        setMessages(response.data.data || [])

        if (socket) {
          socket.emit('join-conversation', conversation._id)
        }

        await markConversationAsRead(conversation._id)
        setUnreadCounts(prev => ({
          ...prev,
          [conversation._id]: 0
        }))
      } catch (error) {
        console.error('Error al cargar conversación:', error)
        ExecutionPermit({ response: error.response })
      }
    },
    [socket]
  )

  const sendMessage = useCallback(
    async content => {
      if (!selectedConversation || !content.trim()) return

      try {
        await sendAdminMessage(selectedConversation._id, content)
      } catch (error) {
        console.error('Error al enviar mensaje:', error)
        ExecutionPermit({ response: error.response })
      }
    },
    [selectedConversation]
  )

  const emitTyping = useCallback(() => {
    if (socket && selectedConversation) {
      socket.emit('typing', { conversationId: selectedConversation._id })
    }
  }, [socket, selectedConversation])

  const emitStopTyping = useCallback(() => {
    if (socket && selectedConversation) {
      socket.emit('stop-typing', { conversationId: selectedConversation._id })
    }
  }, [socket, selectedConversation])

  return {
    conversations,
    selectedConversation,
    messages,
    typingUsers,
    isConnected,
    isLoading,
    unreadCounts,
    selectConversation,
    sendMessage,
    emitTyping,
    emitStopTyping
  }
}

export const useFetchInitAdminChats = () => {
  const adminChat = useAdminChat()

  return {
    adminChat
  }
}
