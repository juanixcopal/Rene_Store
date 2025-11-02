export default ({ categoryData }) => {
    return async ({}) => {
      try {
        const allCategories = await categoryData.findAll()

        return allCategories
        
      } catch (error) {
        console.error(error);
        return {
          status: 500,
          result: false,
          message: "Ocurrió un error al obtener todas las categorías"
        };
      }
    }
}