import { userData, roleData } from '../../data/index.js'
import bcrypt from 'bcrypt' // Asume que usas bcrypt para hashear passwords

export const userResolvers = {
  Query: {
    getAllAdmins: async (_, __, context) => {
      if (!context.user) {
        throw new Error('Usuario no autenticado')
      }

      try {
        const admins = await userData.findAllAdmins()
        return admins
      } catch (error) {
        console.error('Error en getAllAdmins:', error)
        throw new Error('Error al obtener administradores')
      }
    },

    getAllUsers: async (_, __, context) => {
      if (!context.user) {
        throw new Error('Usuario no autenticado')
      }

      try {
        const users = await userData.findAllUsers()
        return users
      } catch (error) {
        console.error('Error en getAllUsers:', error)
        throw new Error('Error al obtener usuarios')
      }
    },

    getAllRoles: async (_, __, context) => {
      if (!context.user) {
        throw new Error('Usuario no autenticado')
      }

      try {
        const roles = await roleData.findAll() // Asume que tienes este método
        return roles
      } catch (error) {
        console.error('Error en getAllRoles:', error)
        throw new Error('Error al obtener roles')
      }
    }
  },

  Mutation: {
    createUser: async (_, { input }, context) => {
      if (!context.user) {
        throw new Error('Usuario no autenticado')
      }

      try {
        const { user_name, user_lastname, email, password, rol } = input

        // Verificar si el usuario ya existe
        const existingUser = await userData.findByEmail(email)
        if (existingUser) {
          return {
            result: false,
            message: 'El correo electrónico ya está registrado',
            user: null
          }
        }

        // Hashear la contraseña
        const hash_pass = await bcrypt.hash(password, 10)

        // Crear el usuario
        const newUser = await userData.createUser({
          user_name,
          user_lastname,
          email,
          hash_pass,
          rol
        })

        return {
          result: true,
          message: 'Usuario creado exitosamente',
          user: newUser
        }
      } catch (error) {
        console.error('Error en createUser:', error)
        return {
          result: false,
          message: 'Error al crear el usuario',
          user: null
        }
      }
    },

    updateUser: async (_, { input }, context) => {
      if (!context.user) {
        throw new Error('Usuario no autenticado')
      }

      try {
        const { email, user_name, user_lastname, rol } = input

        // Verificar si el usuario existe
        const existingUser = await userData.findByEmail(email)
        if (!existingUser) {
          return {
            result: false,
            message: 'Usuario no encontrado',
            user: null
          }
        }

        // Actualizar el usuario
        const updatedUser = await userData.updateUser({
          email,
          user_name,
          user_lastname,
          rol
        })

        return {
          result: true,
          message: 'Usuario actualizado exitosamente',
          user: updatedUser
        }
      } catch (error) {
        console.error('Error en updateUser:', error)
        return {
          result: false,
          message: 'Error al actualizar el usuario',
          user: null
        }
      }
    }
  }
}
