export default ({ userData }) => {
    return async ({}) => {
      try {
        const allUsers = await userData.findAll()

        return allUsers
        
      } catch (error) {
        console.error(error);
        return {
          status: 500,
          result: false,
          message: "Ocurrió un error al obtener todos los usuarios"
        };
      }
    }
}