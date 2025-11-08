export default ({ cartData }) => {
  return async ({ request }) => {
    try {
      const { id } = request.user

      const summary = await cartData.getCartSummary(id)

      return summary
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        result: false,
        message: 'Ocurrió un error al obtener el resumen del carrito',
        detail: error.message
      }
    }
  }
}
