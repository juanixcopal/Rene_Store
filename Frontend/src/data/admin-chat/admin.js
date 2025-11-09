import { instanceAPIRenielStore } from '../../config/data-source'

export const getAllConversations = async () => {
  return await instanceAPIRenielStore.get('/chat/conversations/all')
}

export const getConversationMessages = async conversationId => {
  return await instanceAPIRenielStore.get(`/chat/messages/${conversationId}`)
}

export const sendAdminMessage = async (conversationId, content) => {
  return await instanceAPIRenielStore.post('/chat/message', {
    conversationId,
    content
  })
}

export const markConversationAsRead = async conversationId => {
  return await instanceAPIRenielStore.put(`/chat/messages/${conversationId}/read`)
}
