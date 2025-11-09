import { emitToConversation } from '../../config/socket.config.js'

export default ({ chatData }) => {
  return async ({ request }) => {
    try {
      const userId = request.user.id
      const userRole = request.user.rol
      const { conversationId, content = [] } = request.body

      const messageData = {
        conversation_id: conversationId,
        sender_id: userId,
        sender_role: userRole,
        content,
        readBy: [userId]
      }
      let message = await chatData.createMessage(messageData)

      await chatData.updateLastMessage(conversationId, {
        text: content,
        sender: userId,
        createdAt: message.createdAt
      })

      const messages = await chatData.findMessagesByConversation(conversationId, 0, 1)
      message = messages[0]

      emitToConversation(conversationId, 'new-message', {
        message: message.toObject(),
        conversationId
      })
      return { status: 201, result: true, data: message }
    } catch (error) {
      console.error(error)
      return { status: 500, result: false, message: 'Error al enviar mensaje' }
    }
  }
}
