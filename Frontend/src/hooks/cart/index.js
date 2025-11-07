import { useFetchProductsInCart, useFetchCartSummary } from './fetch-data.js'
import { useActions } from './actions.js'

export const useFetchInitCart = () => {
  const fetchProductsInCart = useFetchProductsInCart()
  const fetchCartSummary = useFetchCartSummary()

  const actions = useActions({ fetchProductsInCart, fetchCartSummary })

  const handleChangeIncreaseQuantityProduct = id => {
    actions.increaseQuantityProduct(id)
  }

  const handleChangeDecreaseQuantityProduct = id => {
    actions.decreaseQuantityProduct(id)
  }

  return {
    handleChangeIncreaseQuantityProduct,
    handleChangeDecreaseQuantityProduct,
    fetchProductsInCart,
    fetchCartSummary,
    actions
  }
}
