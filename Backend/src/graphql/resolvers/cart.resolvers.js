import cartServices from '../../services/cart/index.js'
import { cartData } from '../../data/index.js'

export const cartResolvers = {
  Query: {
    getCartProducts: async (_, __, context) => {
      if (!context.user) {
        throw new Error('Usuario no autenticado')
      }

      const request = { user: context.user }
      const result = await cartServices['products-cart']({ request })

      if (result.status === 500) {
        throw new Error(result.message)
      }

      return result
    },

    getCartSummary: async (_, __, context) => {
      if (!context.user) {
        throw new Error('Usuario no autenticado')
      }

      const request = { user: context.user }
      const result = await cartServices['cart-summary']({ request })

      if (result.status === 500) {
        throw new Error(result.message)
      }

      return result
    }
  },

  Mutation: {
    decreaseProduct: async (_, { productId }, context) => {
      if (!context.user) {
        throw new Error('Usuario no autenticado')
      }

      try {
        // 🔹 Llamar directamente a cartData
        const result = await cartData.decreaseProduct(context.user.id, productId)

        return {
          removed: result.removed,
          cartItem: result.cartItem || null
        }
      } catch (error) {
        console.error('Error en decreaseProduct:', error)
        throw new Error('Error al disminuir el producto del carrito')
      }
    },

    buyCart: async (_, __, context) => {
      if (!context.user) {
        throw new Error('Usuario no autenticado')
      }

      try {
        // 🔹 Llamar directamente a cartData y devolver la orden completa
        const order = await cartData.createOrderFromCart(context.user.id)

        return order
      } catch (error) {
        console.error('Error en buyCart:', error)
        throw new Error(error.message || 'Ocurrió un error al procesar la compra')
      }
    }
  }
}
