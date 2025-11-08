export default ({ cartData }) => {
  return async ({ request }) => {
    try {
      const { id } = request.user

      await cartData.createOrderFromCart(id)

      return {
        status: 200,
        result: true,
        message: 'Compra realizada con éxito!'
      }
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        result: false,
        message: 'Ocurrió un error al procesar la compra'
      }
    }
  }
}
