import { instanceAPIRenielStore, instanceAPIRenielStoreGraphql } from '../../config/data-source'

export const postIncreaseQuantityProduct = async ({
  idProduct,
  fetchProductsInCart,
  fetchCartSummary
}) => {
  const { _getProductsInCart } = fetchProductsInCart
  const { _getCartSummary } = fetchCartSummary

  // ⚠️ Esta función sigue usando REST porque no hay mutation en GraphQL
  // Si quieres migrarla a GraphQL, necesitas crear la mutation en el backend
  await instanceAPIRenielStore
    .post(
      `/product/add/${idProduct}`,
      {},
      {
        headers: {
          service: 'add-to-cart'
        }
      }
    )
    .then(({ data }) => {
      if (data.result) {
        _getProductsInCart && _getProductsInCart()
        _getCartSummary && _getCartSummary()
      }
    })
    .catch(error => {
      console.error('Error al hacer el POST:', error)
      throw error
    })
}

export const postDecreaseQuantityProduct = async ({
  idProduct,
  fetchProductsInCart,
  fetchCartSummary
}) => {
  const { _getProductsInCart } = fetchProductsInCart
  const { _getCartSummary } = fetchCartSummary

  await instanceAPIRenielStoreGraphql
    .post('/graphql', {
      query: `
        mutation {
          decreaseProduct(productId: "${idProduct}") {
            removed
            cartItem {
              _id
              quantity
            }
          }
        }
      `
    })
    .then(({ data }) => {
      // GraphQL siempre devuelve éxito si no hay errores
      if (data.data && data.data.decreaseProduct) {
        _getProductsInCart && _getProductsInCart()
        _getCartSummary && _getCartSummary()
      }
    })
    .catch(error => {
      console.error('Error al hacer el POST:', error)
      throw error
    })
}

export const postBuyCart = async ({ fetchProductsInCart, fetchCartSummary, showAlert }) => {
  const { _getProductsInCart } = fetchProductsInCart
  const { _getCartSummary } = fetchCartSummary

  await instanceAPIRenielStoreGraphql
    .post('/graphql', {
      query: `
        mutation {
          buyCart {
            _id
            total
            items {
              name
              quantity
              price
              subtotal
            }
          }
        }
      `
    })
    .then(({ data }) => {
      if (data.data && data.data.buyCart) {
        showAlert('Compra realizada con éxito', 'success')
        _getProductsInCart && _getProductsInCart()
        _getCartSummary && _getCartSummary()
      }
    })
    .catch(error => {
      console.error('Error al hacer el POST:', error)

      // Manejar errores de GraphQL
      if (error.response?.data?.errors) {
        const errorMessage = error.response.data.errors[0].message
        showAlert(errorMessage, 'warning')
      } else {
        showAlert('Error al procesar la compra', 'error')
      }

      throw error
    })
}
