export default ({ productData }) => {
  return async () => {
    try {
      const products = await productData.find({ gender: 'Hombre' }, 5)

      return products
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        result: false,
        message: 'Ocurrió un error al crear el rol'
      }
    }
  }
}
