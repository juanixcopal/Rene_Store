import { useState, useEffect, useRef } from 'react'
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Avatar,
  CircularProgress,
  Chip
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useFetchInitChats } from '../../../hooks/user-chat/index.js'

const UserChatPage = () => {
  const mainHook = useFetchInitChats()
  const { chatSocket } = mainHook
  const { messages, isTyping, isConnected, isLoading, sendMessage, emitTyping, emitStopTyping } =
    chatSocket

  const [messageInput, setMessageInput] = useState('')
  const [typingTimeout, setTypingTimeout] = useState(null)
  const messagesEndRef = useRef(null)
  const currentUserId = localStorage.getItem('userId') // Asume que tienes el userId guardado

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleInputChange = e => {
    setMessageInput(e.target.value)

    emitTyping()

    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }

    const timeout = setTimeout(() => {
      emitStopTyping()
    }, 1000)

    setTypingTimeout(timeout)
  }

  const handleSendMessage = async e => {
    e.preventDefault()

    if (!messageInput.trim()) return

    await sendMessage(messageInput)
    setMessageInput('')
    emitStopTyping()

    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
  }

  const formatTime = timestamp => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          p: 2,
          borderBottom: '2px solid #E8DDD8',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: '#7B2D26' }}>RS</Avatar>
          <Box>
            <Typography fontSize={18} fontWeight={600} color='#3E2F2F'>
              Soporte - Rene Store
            </Typography>
            <Typography fontSize={14} color='#8B7B7B'>
              {isConnected ? '● En línea' : '○ Desconectado'}
            </Typography>
          </Box>
        </Box>
        <Chip
          label={isConnected ? 'Conectado' : 'Desconectado'}
          color={isConnected ? 'success' : 'default'}
          size='medium'
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 3,
          backgroundColor: '#F9F9F9'
        }}
      >
        {messages.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography fontSize={16} color='#8B7B7B'>
              No hay mensajes aún. ¡Inicia la conversación!
            </Typography>
          </Box>
        ) : (
          <>
            {messages.map((message, index) => {
              const isOwnMessage = message.sender_id._id === currentUserId
              return (
                <Box
                  key={message._id || index}
                  sx={{
                    display: 'flex',
                    justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                    mb: 2
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '70%',
                      display: 'flex',
                      flexDirection: isOwnMessage ? 'row-reverse' : 'row',
                      gap: 1,
                      alignItems: 'flex-end'
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: isOwnMessage ? '#7B2D26' : '#8B7B7B'
                      }}
                    >
                      {message.sender_id.user_name?.[0]?.toUpperCase()}
                    </Avatar>
                    <Box>
                      <Paper
                        sx={{
                          p: 2,
                          backgroundColor: isOwnMessage ? '#7B2D26' : '#3E2F2F',
                          color: isOwnMessage ? '#FFFFFF' : '#3E2F2F',
                          borderRadius: isOwnMessage ? '20px 20px 0 20px' : '20px 20px 20px 0'
                        }}
                      >
                        <Typography fontSize={14} fontWeight={500} sx={{ color: '#FFFFFF' }}>
                          {message.content}
                        </Typography>
                      </Paper>
                      <Typography
                        fontSize={14}
                        color='#8B7B7B'
                        sx={{
                          mt: 0.5,
                          textAlign: isOwnMessage ? 'right' : 'left'
                        }}
                      >
                        {formatTime(message.createdAt)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )
            })}
            {isTyping && (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#8B7B7B' }}></Avatar>
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px 20px 20px 0'
                  }}
                >
                  <Typography fontSize={14} color='#8B7B7B'>
                    Escribiendo...
                  </Typography>
                </Paper>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </Box>

      <Box
        component='form'
        onSubmit={handleSendMessage}
        sx={{
          p: 2,
          borderTop: '2px solid #E8DDD8',
          backgroundColor: '#FFFFFF'
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            placeholder='Escribe tu mensaje...'
            value={messageInput}
            onChange={handleInputChange}
            disabled={!isConnected}
            variant='outlined'
            size='small'
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                backgroundColor: '#F9F9F9'
              }
            }}
          />
          <IconButton
            type='submit'
            disabled={!isConnected || !messageInput.trim()}
            sx={{
              backgroundColor: '#7B2D26',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#5A1F1A'
              },
              '&:disabled': {
                backgroundColor: '#E8DDD8'
              }
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default UserChatPage
