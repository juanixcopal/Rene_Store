export default ({ orderData }) => {
  return async ({ request }) => {
    try {
      const { id } = request.user

      const orders = await orderData.findByUser(id)

      return orders
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        result: false,
        message: 'Ocurrió un error al obtener todos los pedidos del usuario'
      }
    }
  }
}
