export default ({ chatData }) => {
  return async ({ request }) => {
    try {
      const userId = request.user.id
      const { adminId } = request.body

      let conversation

      if (adminId) {
        const participants = [userId, adminId]
        conversation = await chatData.findConversationByParticipants(participants)

        if (!conversation) {
          conversation = await chatData.createConversation(participants)
          conversation = await chatData.findConversationById(conversation._id)
        }
      } else {
        const conversations = await chatData.findConversationsByUserId(userId, 0, 1)
        conversation = conversations[0]

        if (!conversation) {
          conversation = await chatData.createConversation([userId])
          conversation = await chatData.findConversationById(conversation._id)
        }
      }

      return {
        status: 200,
        result: true,
        data: conversation
      }
    } catch (error) {
      console.error('Error en get-or-create-conversation:', error)
      return {
        status: 500,
        result: false,
        message: 'Error al obtener o crear conversación'
      }
    }
  }
}
