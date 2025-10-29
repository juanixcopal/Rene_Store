export default ({ roleData }) => {
    return async ({}) => {
      try {
        const allRol = await roleData.findAll()

        return allRol
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