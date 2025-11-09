import { chatData } from '../../data/index.js'

import makeGetOrCreateConversation from './get-or-create-conversation.service.js'
import makeUserConversations from './user-conversations.service.js'
import makeAllConversations from './all-conversations.service.js'
import makeSendMessage from './send-message.service.js'
import makeConversationMessages from './conversation-messages.service.js'
import makeMarkAsRead from './mark-as-read.service.js'
import makeUnreadCount from './unread-count.service.js'

const getOrCreateConversation = makeGetOrCreateConversation({ chatData })
const userConversations = makeUserConversations({ chatData })
const allConversations = makeAllConversations({ chatData })
const sendMessage = makeSendMessage({ chatData })
const conversationMessages = makeConversationMessages({ chatData })
const markAsRead = makeMarkAsRead({ chatData })
const unreadCount = makeUnreadCount({ chatData })

const chatServices = {
  'get-or-create-conversation': getOrCreateConversation,
  'user-conversations': userConversations,
  'all-conversations': allConversations,
  'send-message': sendMessage,
  'conversation-messages': conversationMessages,
  'mark-as-read': markAsRead,
  'unread-count': unreadCount
}

export default chatServices
