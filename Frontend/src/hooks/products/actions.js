import { useAlert } from '../../provider/alert-provider'
import { postCreateProduct } from '../../data/products/post.js'
import { postEditProduct } from '../../data/products/put.js'

export const useActions = ({
  selectedImage,
  dataNewProduct,
  fechtAllProducts,
  toggle,
  dataUpdateProduct
}) => {
  const showAlert = useAlert()

  const createNewProduct = async e => {
    e.preventDefault()
    postCreateProduct({ dataNewProduct, selectedImage, showAlert, fechtAllProducts, toggle })
  }

  const editProduct = async e => {
    e.preventDefault()
    postEditProduct({ dataUpdateProduct, showAlert, fechtAllProducts, toggle })
  }

  return {
    createNewProduct,
    editProduct
  }
}
