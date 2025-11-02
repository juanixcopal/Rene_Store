export default ({ productData }) => {
    return async ({ request }) => {
      try {
        const { name, description, price, stock, categoryName, categoryGender } = request.body
        const image = request.file?.path
  
        const existing = await productData.findByName(name)
        if (existing) {
          return {
            status: 200,
            result: true,
            message: 'Este producto ya existe en el sistema'
          }
        }

        const params = {name, description, price, stock, image, categoryName, categoryGender}
  
        await productData.createProduct(params)
  
        return {
          status: 201,
          result: true,
          message: 'Producto creado exitosamente'
        }
      } catch (error) {
        console.error(error)
        return {
          status: 500,
          result: false,
          message: 'Ocurrió un error al crear el producto'
        }
      }
    }
  }
  