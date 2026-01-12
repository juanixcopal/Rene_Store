import { ApolloServer } from 'apollo-server-express'
import { cartTypeDefs } from './schemas/cart.schema.js'
import { cartResolvers } from './resolvers/cart.resolvers.js'
import { userTypeDefs } from './schemas/user.schema.js'
import { userResolvers } from './resolvers/user.resolvers.js'
import jwt from 'jsonwebtoken'

const typeDefs = [cartTypeDefs, userTypeDefs] // 👈 Añade userTypeDefs
const resolvers = [cartResolvers, userResolvers] // 👈 Añade userResolvers

export function createApolloServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const token = req.headers['token'] || req.headers.authorization?.replace('Bearer ', '')

      if (!token) {
        return { user: null }
      }

      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        return {
          user: decodedToken
        }
      } catch (error) {
        console.error('Error verificando token en GraphQL:', error.message)
        return { user: null }
      }
    },
    formatError: error => {
      console.error('GraphQL Error:', error)
      return {
        message: error.message,
        code: error.extensions?.code || 'INTERNAL_SERVER_ERROR'
      }
    },
    playground: true,
    introspection: true
  })
}
