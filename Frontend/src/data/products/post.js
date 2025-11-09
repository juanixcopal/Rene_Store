import { instanceAPIRenielStore } from '../../config/data-source'

export const postCreateProduct = async ({
  selectedImage,
  dataNewProduct,
  showAlert,
  fechtAllProducts,
  toggle
}) => {
  const { _getAllProducts } = fechtAllProducts
  const formData = new FormData()

  formData.append('image', selectedImage)

  for (const key in dataNewProduct) {
    formData.append(key, dataNewProduct[key])
  }

  await instanceAPIRenielStore
    .post('product/manager', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        service: 'add-to-cart'
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
