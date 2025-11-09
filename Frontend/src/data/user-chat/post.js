import { instanceAPIRenielStore } from '../../config/data-source'

export const sendMessage = async (conversationId, content) => {
  return await instanceAPIRenielStore.post('/chat/message', {
    conversationId,
    content
  })
}

export const markMessagesAsRead = async conversationId => {
  return await instanceAPIRenielStore.put(`/chat/messages/${conversationId}/read`)
}
