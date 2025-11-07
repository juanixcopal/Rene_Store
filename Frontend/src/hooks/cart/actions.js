import { useAlert } from '../../provider/alert-provider.js'
import {
  postIncreaseQuantityProduct,
  postDecreaseQuantityProduct,
  postBuyCart
} from '../../data/cart/post.js'

export const useActions = ({ fetchProductsInCart, fetchCartSummary }) => {
  const showAlert = useAlert()

  const increaseQuantityProduct = async id => {
    postIncreaseQuantityProduct({ idProduct: id, fetchProductsInCart, fetchCartSummary })
  }

  const decreaseQuantityProduct = async id => {
    postDecreaseQuantityProduct({ idProduct: id, fetchProductsInCart, fetchCartSummary })
  }

  const buyCart = async e => {
    e.preventDefault()
    postBuyCart({ fetchCartSummary, fetchProductsInCart, showAlert })
  }

  return { increaseQuantityProduct, decreaseQuantityProduct, buyCart }
}
