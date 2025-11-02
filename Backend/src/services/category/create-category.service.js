export default ({ categoryData }) => {
    return async ({ request }) => {
      try {
        
        const {product, gender} = request.body

        const existing = await categoryData.findByProductAndGender(product, gender);

        if (existing) {
          return {
            status: 200,
            result: true,
            message: "Este producto ya está registrada en el sistema"
          };
        }
        
        await categoryData.create(product, gender);

        return {
          status: 201,
          result: true,
          message: "Producto creado exitosamente",
        };
        
      } catch (error) {
        console.error(error);
        return {
          status: 500,
          result: false,
          message: "Ocurrió un error al crear el producto"
        };
      }
    }
}