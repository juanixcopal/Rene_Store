export default ({ productData }) => {
  return async ({ request }) => {
    try {
      const { idProduct } = request.params

      await productData.softDelete(idProduct)

      return {
        status: 201,
        result: true,
        message: 'Producto eliminado correctamente!'
      }
    } catch (error) {
      console.error(error)
      return {
        result: false,
        message: 'Error al eliminar el producto'
      }
    }
  }
}
