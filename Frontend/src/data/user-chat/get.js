import { instanceAPIRenielStore } from '../../config/data-source'

export const getOrCreateConversation = async () => {
  return await instanceAPIRenielStore.post('/chat/conversation', {})
}

export const getConversationMessages = async conversationId => {
  return await instanceAPIRenielStore.get(`/chat/messages/${conversationId}`)
}

export const getUserConversations = async () => {
  return await instanceAPIRenielStore.get('/chat/conversations')
}

export const getUnreadCount = async () => {
  return await instanceAPIRenielStore.get('/chat/unread-count')
}
