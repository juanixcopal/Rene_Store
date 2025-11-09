export default function makeChatData({ Conversation, Message }) {
  return Object.freeze({
    findConversationByParticipants,
    findConversationById,
    findConversationsByUserId,
    findAllConversations,
    createConversation,
    updateLastMessage,
    countConversations,

    createMessage,
    findMessagesByConversation,
    countMessagesByConversation,
    markMessagesAsRead,
    countUnreadMessages,
    countUnreadByConversation
  })

  async function findConversationByParticipants(participants) {
    return Conversation.findOne({
      participants: { $all: participants }
    }).populate('participants', 'user_name user_lastname email rol')
  }

  async function findConversationById(conversationId) {
    return Conversation.findById(conversationId)
      .populate('participants', 'user_name user_lastname email rol')
      .populate('lastMessage.sender', 'user_name user_lastname email')
  }

  async function findConversationsByUserId(userId, skip = 0, limit = 20) {
    const conversations = await Conversation.find({
      participants: userId
    })
      .populate('participants', 'user_name user_lastname email rol')
      .populate('lastMessage.sender', 'user_name user_lastname email')
      .sort({ 'lastMessage.createdAt': -1, updatedAt: -1 })
      .skip(skip)
      .limit(limit)

    const results = await Promise.all(
      conversations.map(async conv => {
        const unreadCount = await Message.countDocuments({
          conversation_id: conv._id,
          sender_id: { $ne: userId },
          readBy: { $ne: userId }
        })
        return { ...conv.toObject(), unreadCount }
      })
    )

    return results
  }

  async function findAllConversations(skip = 0, limit = 20) {
    return Conversation.find()
      .populate('participants', 'user_name user_lastname email rol')
      .populate('lastMessage.sender', 'user_name user_lastname email')
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
  }

  async function createConversation(participants) {
    const conversation = new Conversation({
      participants,
      lastMessage: null
    })
    return conversation.save()
  }

  async function updateLastMessage(conversationId, lastMessageData) {
    return Conversation.findByIdAndUpdate(
      conversationId,
      { lastMessage: lastMessageData },
      { new: true }
    )
  }

  async function countConversations() {
    return Conversation.countDocuments()
  }

  async function createMessage(messageData) {
    const message = new Message(messageData)
    return message.save()
  }

  async function findMessagesByConversation(conversationId, skip = 0, limit = 50) {
    return Message.find({ conversation_id: conversationId })
      .populate('sender_id', 'user_name user_lastname email rol')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
  }

  async function countMessagesByConversation(conversationId) {
    return Message.countDocuments({ conversation_id: conversationId })
  }

  async function markMessagesAsRead(conversationId, userId) {
    return Message.updateMany(
      {
        conversation_id: conversationId,
        sender_id: { $ne: userId },
        readBy: { $ne: userId }
      },
      {
        $addToSet: { readBy: userId }
      }
    )
  }

  async function countUnreadMessages(userId, conversationIds) {
    return Message.countDocuments({
      sender_id: { $ne: userId },
      readBy: { $ne: userId },
      conversation_id: { $in: conversationIds }
    })
  }

  async function countUnreadByConversation(conversationId, userId) {
    return Message.countDocuments({
      conversation_id: conversationId,
      sender_id: { $ne: userId },
      readBy: { $ne: userId }
    })
  }
}
