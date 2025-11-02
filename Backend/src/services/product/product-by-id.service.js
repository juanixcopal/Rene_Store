export default ({ productData }) => {
    return async ({request}) => {
      try {
        const { id } = request.params
        
        const product = await productData.findById(id);
        
        if (!product) return { status: 404, result: false, message: 'Producto no encontrado' };

        return product

      } catch (error) {
        console.error(error);
        return {
          status: 500,
          result: false,
          message: "Ocurrió un error al crear el rol"
        };
      }
    }
}