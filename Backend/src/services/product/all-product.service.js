export default ({ productData }) => {
    return async () => {
      try {
        const allProducts = await productData.findAll()

        return allProducts
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