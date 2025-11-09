export default ({ chatData }) => {
  return async ({ request }) => {
    try {
      const { page = 1, limit = 20 } = request.query
      const skip = (parseInt(page) - 1) * parseInt(limit)

      const conversations = await chatData.findAllConversations(skip, parseInt(limit))
      const total = await chatData.countConversations()

      return {
        status: 200,
        result: true,
        data: conversations,
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
        message: 'Error al obtener todas las conversaciones'
      }
    }
  }
}
