export default ({ orderData }) => {
  return async () => {
    try {
      const orders = await orderData.findAll()

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
