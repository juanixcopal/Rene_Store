export default ({ roleData }) => {
    return async ({ request }) => {
      try {
        const {rol} = request.body        

        const existing = await roleData.findByName(rol);

        if (existing) {
          return {
            status: 200,
            result: true,
            message: "El rol ya está registrado en el sistema"
          };
        }
        
        await roleData.create(rol);        

        return {
          status: 201,
          result: true,
          message: "Rol creado exitosamente",
        };
        
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