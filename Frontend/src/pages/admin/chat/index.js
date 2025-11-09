import { useState, useEffect, useRef } from 'react'
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Avatar,
  CircularProgress,
  Chip,
  Badge,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import { useFetchInitAdminChats } from '../../../hooks/admin-chat/index.js'

const AdminChatsPage = () => {
  const mainHook = useFetchInitAdminChats()
  const { adminChat } = mainHook
  const {
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
  } = adminChat

  const [messageInput, setMessageInput] = useState('')
  const [typingTimeout, setTypingTimeout] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const messagesEndRef = useRef(null)
  const currentUserId = localStorage.getItem('userId')

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const filteredConversations = conversations.filter(conv => {
    const userName =
      `${conv.participants[0]?.user_name} ${conv.participants[0]?.user_lastname}`.toLowerCase()
    return userName.includes(searchTerm.toLowerCase())
  })

  const handleInputChange = e => {
    setMessageInput(e.target.value)
    emitTyping()

    if (typingTimeout) clearTimeout(typingTimeout)

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

    if (typingTimeout) clearTimeout(typingTimeout)
  }

  const formatTime = timestamp => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatRelativeDate = timestamp => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Ahora'
    if (diffInHours < 24) return `Hace ${diffInHours}h`
    if (diffInHours < 48) return 'Ayer'
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Box marginBottom={'20px'} display='flex' justifyContent='space-between' alignItems='center'>
        <Typography fontSize={22} fontWeight={500} color='#3E2F2F'>
          Chat de Soporte
        </Typography>
        <Chip
          label={isConnected ? 'Conectado' : 'Desconectado'}
          color={isConnected ? 'success' : 'default'}
          size='medium'
        />
      </Box>

      <Paper sx={{ height: 'calc(100vh - 180px)', display: 'flex', overflow: 'hidden' }}>
        <Box
          sx={{
            width: '350px',
            borderRight: '2px solid #E8DDD8',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ p: 2, borderBottom: '1px solid #E8DDD8' }}>
            <TextField
              fullWidth
              size='small'
              placeholder='Buscar conversación...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  backgroundColor: '#F9F9F9'
                }
              }}
            />
          </Box>

          <List sx={{ flex: 1, overflow: 'auto', p: 0 }}>
            {filteredConversations.length === 0 ? (
              <Box sx={{ textAlign: 'center', mt: 4, px: 2 }}>
                <ChatBubbleOutlineIcon sx={{ fontSize: 48, color: '#E8DDD8', mb: 2 }} />
                <Typography fontSize={14} color='#8B7B7B'>
                  No hay conversaciones
                </Typography>
              </Box>
            ) : (
              filteredConversations.map(conv => {
                const user = conv.participants[0]

                const unreadCount = unreadCounts[conv._id] || 0
                const isSelected = selectedConversation?._id === conv._id

                return (
                  <Box key={conv._id}>
                    <ListItemButton
                      onClick={e => {
                        e.preventDefault()
                        selectConversation(conv)
                      }}
                      selected={isSelected}
                      component='div'
                      sx={{
                        py: 2,
                        backgroundColor: isSelected ? '#FFF5F3' : 'transparent',
                        '&:hover': { backgroundColor: '#F9F9F9' }
                      }}
                    >
                      <ListItemAvatar>
                        <Badge badgeContent={unreadCount} color='error'>
                          <Avatar sx={{ bgcolor: '#7B2D26' }}>
                            {user?.email?.[0]?.toUpperCase()}
                          </Avatar>
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography fontSize={15} fontWeight={600} color='#3E2F2F'>
                            {user?.user_name} {user?.user_lastname}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            fontSize={13}
                            color='#8B7B7B'
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {conv.lastMessage?.text || 'Nueva conversación'}
                          </Typography>
                        }
                      />
                      <Typography fontSize={11} color='#8B7B7B'>
                        {formatRelativeDate(conv.updatedAt)}
                      </Typography>
                    </ListItemButton>
                    <Divider />
                  </Box>
                )
              })
            )}
          </List>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {!selectedConversation ? (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F9F9F9'
              }}
            >
              <ChatBubbleOutlineIcon sx={{ fontSize: 64, color: '#E8DDD8', mb: 2 }} />
              <Typography fontSize={18} fontWeight={500} color='#8B7B7B'>
                Selecciona una conversación para comenzar
              </Typography>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  p: 2,
                  borderBottom: '2px solid #E8DDD8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <Avatar sx={{ bgcolor: '#7B2D26' }}>
                  {selectedConversation.participants[0]?.user_name?.[0]?.toUpperCase()}
                </Avatar>
                <Box>
                  <Typography fontSize={16} fontWeight={600} color='#3E2F2F'>
                    {selectedConversation.participants[0]?.user_name}{' '}
                    {selectedConversation.participants[0]?.user_lastname}
                  </Typography>
                  <Typography fontSize={13} color='#8B7B7B'>
                    {selectedConversation.participants[0]?.email}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ flex: 1, overflowY: 'auto', p: 3, backgroundColor: '#F9F9F9' }}>
                {messages.length === 0 ? (
                  <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography fontSize={14} color='#8B7B7B'>
                      No hay mensajes en esta conversación
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
                                  borderRadius: isOwnMessage
                                    ? '20px 20px 0 20px'
                                    : '20px 20px 20px 0'
                                }}
                              >
                                <Typography
                                  fontSize={14}
                                  fontWeight={500}
                                  sx={{ color: '#FFFFFF' }}
                                >
                                  {message.content}
                                </Typography>
                              </Paper>
                              <Typography
                                fontSize={14}
                                color='#8B7B7B'
                                sx={{ mt: 0.5, textAlign: isOwnMessage ? 'right' : 'left' }}
                              >
                                {formatTime(message.createdAt)}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      )
                    })}
                    {typingUsers[selectedConversation._id] && (
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
                sx={{ p: 2, borderTop: '2px solid #E8DDD8', backgroundColor: '#FFFFFF' }}
              >
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    placeholder='Escribe tu respuesta...'
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
                      '&:hover': { backgroundColor: '#5A1F1A' },
                      '&:disabled': { backgroundColor: '#E8DDD8' }
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </>
  )
}

export default AdminChatsPage
