import { instanceAPIRenielStore } from '../../config/data-source'

export const postAddToCart = async ({ idProduct, showAlert }) => {
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
        showAlert(data.message, 'success')
      } else {
        showAlert(data.message, 'warning')
      }
    })
    .catch(error => {
      console.log('ERROR', error)

      showAlert('Error interno, estamos trabajando para mejorar el sistema', 'warning')
    })
}
