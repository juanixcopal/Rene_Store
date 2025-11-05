export default ({ productData }) => {
  return async ({ request }) => {
    try {
      const { id } = request.user
      const { idProduct } = request.params
      const qty = 1

      await productData.addToCart(id, idProduct, qty)

      return {
        status: 201,
        result: true,
        message: 'Producto añadido al carrito exitosamente'
      }
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        result: false,
        message: 'Ocurrió un error al añadir el producto al carrito'
      }
    }
  }
}
