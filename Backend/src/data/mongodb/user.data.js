export default function makeUserData({ User, Rol }) {
  return Object.freeze({
    findAllAdmins,
    findAllUsers,
    findByEmail,
    createUser,
    updateUser
  })

  async function findAllAdmins() {
    const rolAdmin = await Rol.findOne({ rol: 'Administrador' })
    if (!rolAdmin) return []
    return User.find({ rol_id: rolAdmin._id }).populate('rol_id', 'rol')
  }

  async function findAllUsers() {
    const rolUser = await Rol.findOne({ rol: 'Usuario' })
    if (!rolUser) return []
    return User.find({ rol_id: rolUser._id }).populate('rol_id', 'rol')
  }

  async function findByEmail(email) {
    return User.findOne({ email }).populate('rol_id', 'rol')
  }

  async function createUser(params) {
    const { user_name, user_lastname, email, hash_pass, rol } = params
    const role = await Rol.findOne({ rol })

    const usuario = new User({
      user_name,
      user_lastname,
      email,
      password: hash_pass,
      rol_id: role._id
    })

    return usuario.save()
  }

  async function updateUser(params) {
    const { email, user_name, user_lastname, rol } = params

    const usuario = await User.findOne({ email })

    const role = await Rol.findOne({ rol })

    usuario.user_name = user_name
    usuario.user_lastname = user_lastname
    usuario.rol_id = role._id

    return usuario.save()
  }
}
