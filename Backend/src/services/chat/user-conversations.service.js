export default ({ chatData }) => {
  return async ({ request }) => {
    try {
      const userId = request.user.id

      const conversations = await chatData.findConversationsByUserId(userId)

      const conversationsWithUnread = await Promise.all(
        conversations.map(async conv => {
          const unreadCount = await chatData.countUnreadByConversation(conv._id, userId)
          return {
            ...conv.toObject(),
            unreadCount
          }
        })
      )

      return {
        status: 200,
        result: true,
        data: conversationsWithUnread
      }
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        result: false,
        message: 'Error al obtener conversaciones'
      }
    }
  }
}
