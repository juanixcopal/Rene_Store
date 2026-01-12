import { gql } from 'apollo-server-express'

export const userTypeDefs = gql`
  type Role {
    _id: ID!
    rol: String!
  }

  type User {
    _id: ID!
    user_name: String!
    user_lastname: String!
    email: String!
    rol_id: Role!
    createdAt: String
  }

  input CreateUserInput {
    user_name: String!
    user_lastname: String!
    email: String!
    password: String!
    rol: String!
  }

  input UpdateUserInput {
    email: String!
    user_name: String!
    user_lastname: String!
    rol: String!
  }

  type UserResponse {
    result: Boolean!
    message: String!
    user: User
  }

  type Query {
    # Obtener todos los administradores
    getAllAdmins: [User!]!

    # Obtener todos los usuarios (rol Usuario)
    getAllUsers: [User!]!

    # Obtener todos los roles
    getAllRoles: [Role!]!
  }

  type Mutation {
    # Crear un nuevo usuario
    createUser(input: CreateUserInput!): UserResponse!

    # Actualizar un usuario existente
    updateUser(input: UpdateUserInput!): UserResponse!
  }
`
