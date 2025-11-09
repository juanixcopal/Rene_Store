export default ({ chatData }) => {
  return async ({ request }) => {
    try {
      const { conversationId } = request.params
      const { page = 1, limit = 50 } = request.query

      const skip = (parseInt(page) - 1) * parseInt(limit)
      const messages = await chatData.findMessagesByConversation(
        conversationId,
        skip,
        parseInt(limit)
      )
      const total = await chatData.countMessagesByConversation(conversationId)

      return {
        status: 200,
        result: true,
        data: messages.reverse(), // Más antiguo primero
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        result: false,
        message: 'Error al obtener mensajes'
      }
    }
  }
}
