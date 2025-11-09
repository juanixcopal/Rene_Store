export default ({ chatData }) => {
  return async ({ request }) => {
    try {
      const userId = request.user.id

      const conversations = await chatData.findConversationsByUserId(userId, 0, 1000)
      const conversationIds = conversations.map(c => c._id)

      const count = await chatData.countUnreadMessages(userId, conversationIds)

      return {
        status: 200,
        result: true,
        data: { unreadCount: count }
      }
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        result: false,
        message: 'Error al obtener mensajes no leídos'
      }
    }
  }
}
