export default ({ productData }) => {
  return async ({ request }) => {
    try {
      const { gender, category } = request.params

      const products = await productData.find({ gender: gender, categoryName: category })

      return products
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        result: false,
        message: 'Ocurrió un error al obtener todos los productos para hombres'
      }
    }
  }
}
