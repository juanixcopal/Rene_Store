export default ({ productData }) => {
  return async ({ request }) => {
    try {
      const { idProduct } = request.params
      const { name, description, price, stock, idCategory } = request.body
      const image = request.file?.path

      const product = await productData.findById(idProduct)
      if (!product) {
        return {
          status: 404,
          result: false,
          message: 'Producto no encontrado'
        }
      }

      const existing = await productData.findByName(name)
      if (existing && existing._id.toString() !== idProduct) {
        return {
          status: 400,
          result: false,
          message: 'Ya existe otro producto con ese nombre'
        }
      }

      product.name = name || product.name
      product.description = description || product.description
      product.price = price ?? product.price
      product.stock = stock ?? product.stock
      product.category_id = idCategory || product.category_id

      if (image) {
        product.image = image
      }

      await product.save()

      return {
        status: 200,
        result: true,
        message: 'Producto actualizado correctamente'
      }
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        result: false,
        message: 'Ocurrió un error al actualizar el producto'
      }
    }
  }
}
