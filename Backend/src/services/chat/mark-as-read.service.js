import { emitToUser } from '../../config/socket.config.js'

export default ({ chatData }) => {
  return async ({ request }) => {
    try {
      const userId = request.user.id
      const { conversationId } = request.params

      const result = await chatData.markMessagesAsRead(conversationId, userId)

      const conversation = await chatData.findConversationById(conversationId)
      const participantIds = conversation.participants.map(p => p._id.toString())
      const otherParticipants = participantIds.filter(id => id !== userId)

      otherParticipants.forEach(participantId => {
        emitToUser(participantId, 'messages-read', {
          conversationId,
          readBy: userId
        })
      })

      return {
        status: 200,
        result: true,
        data: { modifiedCount: result.modifiedCount }
      }
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        result: false,
        message: 'Error al marcar mensajes como leídos'
      }
    }
  }
}
