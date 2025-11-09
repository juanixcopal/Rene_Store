import { instanceAPIRenielStore } from '../../config/data-source'

export const deleteProductById = async ({ showAlert, fechtAllProducts, toggle, dataModal }) => {
  const { params } = dataModal
  const { _getAllProducts } = fechtAllProducts

  await instanceAPIRenielStore
    .delete(`product/manager/${params._id}`, {
      headers: {
        service: 'delete-product'
      }
    })
    .then(({ data }) => {
      if (data.result) {
        showAlert(data.message, 'success')
        _getAllProducts && _getAllProducts()
        toggle && toggle()
      } else {
        showAlert(data.message, 'warning')
      }
    })
    .catch(error => {
      console.log('ERROR', error)
      showAlert('Error interno, estamos trabajando para mejorar el sistema', 'warning')
    })
}
