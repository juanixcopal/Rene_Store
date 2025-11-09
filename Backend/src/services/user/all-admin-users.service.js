export default ({ userData }) => {
  return async ({}) => {
    try {
      const allAdminUsers = await userData.findAllAdmins()

      return allAdminUsers
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        result: false,
        message: 'Ocurrió un error al obtener todos los usuarios administradores'
      }
    }
  }
}
