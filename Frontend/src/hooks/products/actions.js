import { useAlert } from '../../provider/alert-provider'
import { postCreateProduct } from '../../data/products/post.js'
import { postEditProduct } from '../../data/products/put.js'
import { deleteProductById } from '../../data/products/delete.js'

export const useActions = ({
  selectedImage,
  dataNewProduct,
  fechtAllProducts,
  toggle,
  dataUpdateProduct,
  dataModal
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

  const deleteProduct = async e => {
    e.preventDefault()
    deleteProductById({ dataModal, fechtAllProducts, showAlert, toggle })
  }

  return {
    createNewProduct,
    editProduct,
    deleteProduct
  }
}
