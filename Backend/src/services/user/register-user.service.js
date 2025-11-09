export default ({ userData }) => {
  return async ({ request, helpersObject }) => {
    try {
      const { user_name, user_lastname, email, password, repeat_password } = request.body
      const rol = 'Usuario'

      const { encryptPasswordHelper } = helpersObject

      if (password !== repeat_password) {
        return { result: false, message: 'Valide que las contraseñas sean iguales' }
      }

      const existing = await userData.findByEmail(email)

      if (existing) {
        return {
          status: 200,
          result: true,
          message: 'El correo ya está registrado en el sistema'
        }
      }

      const hash_pass = await encryptPasswordHelper(password)

      const params = { user_name, user_lastname, email, hash_pass, rol }

      await userData.createUser(params)

      return {
        status: 201,
        result: true,
        message: 'Usuario creado exitosamente'
      }
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        result: false,
        message: 'Ocurrió un error al crear el usuario'
      }
    }
  }
}
