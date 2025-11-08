export default ({ cartData }) => {
  return async ({ request }) => {
    try {
      const { id } = request.user
      const { idProduct } = request.params

      const product = await cartData.decreaseProduct(id, idProduct)

      return {
        status: 201,
        result: true,
        message: 'Desincremento de cantidad de producto',
        product
      }
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        result: false,
        message: 'Ocurrió un error al desincrementar el producto del carrito'
      }
    }
  }
}
