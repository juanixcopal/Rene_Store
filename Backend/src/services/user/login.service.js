export default ({ userData }) => {
  return async ({ request, helpersObject }) => {
    try {
      const { email, password } = request.body
      const { generateTokenHelper, validatePasswordHelper } = helpersObject

      const existing = await userData.findByEmail(email)

      if (!existing) {
        return {
          status: 200,
          result: true,
          message: 'Usuario no registrado'
        }
      }

      const { user_name, user_lastname, password: hash, rol_id, _id: id } = existing
      const { rol } = rol_id

      const payload = { id, user_name, user_lastname, rol, email }

      const validatePassword = await validatePasswordHelper(password, hash)

      if (!validatePassword) {
        return {
          status: 401,
          message: 'Correo electrónico o contraseña son incorrectos',
          result: false
        }
      }

      const token = await generateTokenHelper(payload)

      if (rol == 'Administrador') {
        return {
          status: 200,
          result: true,
          token,
          id: id,
          redirect: '/admin/dashboard'
        }
      }

      if (rol == 'Usuario') {
        return {
          status: 200,
          result: true,
          token,
          id: id,
          redirect: '/home'
        }
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
