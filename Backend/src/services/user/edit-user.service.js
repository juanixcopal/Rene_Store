export default ({ userData }) => {
  return async ({ request }) => {
    try {
      const { user_name, user_lastname, email, rol } = request.body

      const params = { user_name, user_lastname, email, rol }

      await userData.updateUser(params)

      return {
        status: 201,
        result: true,
        message: 'Usuario actualizado exitosamente'
      }
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        result: false,
        message: 'Ocurrió un error al editar el usuario'
      }
    }
  }
}
