import { instanceAPIRenielStore } from '../../config/data-source'

export const postEditProduct = async ({
  dataUpdateProduct,
  showAlert,
  fechtAllProducts,
  toggle
}) => {
  const { _getAllProducts } = fechtAllProducts
  const formData = new FormData()

  if (dataUpdateProduct.image instanceof File) {
    formData.append('image', dataUpdateProduct.image)
  }

  for (const key in dataUpdateProduct) {
    if (key !== '_id' && key !== 'image') {
      formData.append(key, dataUpdateProduct[key])
    }
  }

  await instanceAPIRenielStore
    .put(`product/manager/${dataUpdateProduct._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        service: 'edit-product'
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
