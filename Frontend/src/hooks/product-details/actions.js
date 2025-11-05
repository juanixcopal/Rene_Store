import { useAlert } from '../../provider/alert-provider.js'
import { postAddToCart } from '../../data/product-details/post.js'

export const useActions = ({ idProduct }) => {
  const showAlert = useAlert()

  const addToCart = async e => {
    e.preventDefault()
    postAddToCart({ idProduct, showAlert })
  }

  return { addToCart }
}
