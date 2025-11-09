import { useAlert } from '../../provider/alert-provider'
import { postCreateProduct } from '../../data/products/post'

export const useActions = ({ selectedImage, dataNewProduct, fechtAllProducts, toggle }) => {
  const showAlert = useAlert()

  const createNewProduct = async e => {
    e.preventDefault()
    postCreateProduct({ dataNewProduct, selectedImage, showAlert, fechtAllProducts, toggle })
  }

  return {
    createNewProduct
  }
}
