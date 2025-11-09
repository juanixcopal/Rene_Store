export default ({ userData }) => {
  return async ({}) => {
    try {
      const allUserUsers = await userData.findAllUsers()

      return allUserUsers
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        result: false,
        message: 'Ocurrió un error al obtener todos los usuarios tipo usuarios'
      }
    }
  }
}
