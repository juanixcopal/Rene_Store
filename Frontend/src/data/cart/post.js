import { instanceAPIRenielStore } from '../../config/data-source'

export const postIncreaseQuantityProduct = async ({
  idProduct,
  fetchProductsInCart,
  fetchCartSummary
}) => {
  const { _getProductsInCart } = fetchProductsInCart
  const { _getCartSummary } = fetchCartSummary

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

  await instanceAPIRenielStore
    .post(
      `/cart/decrease/${idProduct}`,
      {},
      {
        headers: {
          service: 'decrease-product'
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

export const postBuyCart = async ({ fetchProductsInCart, fetchCartSummary, showAlert }) => {
  const { _getProductsInCart } = fetchProductsInCart
  const { _getCartSummary } = fetchCartSummary

  await instanceAPIRenielStore
    .post(
      '/cart/buy',
      {},
      {
        headers: {
          service: 'buy-cart'
        }
      }
    )
    .then(({ data }) => {
      if (data.result) {
        showAlert(data.message, 'success')
        _getProductsInCart && _getProductsInCart()
        _getCartSummary && _getCartSummary()
      } else {
        showAlert(data.message, 'warning')
      }
    })
    .catch(error => {
      console.error('Error al hacer el POST:', error)
      throw error
    })
}
