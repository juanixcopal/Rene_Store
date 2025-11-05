export default ({ cartData }) => {
  return async ({ request }) => {
    try {
      const { id } = request.user

      const cartItems = await cartData.findCartByUser(id)

      if (!cartItems || cartItems.length === 0) {
        return []
      }

      return cartItems
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        result: false,
        message: 'Ocurrió un error al obtener todos los productos del carrito'
      }
    }
  }
}
