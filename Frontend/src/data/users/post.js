import { instanceAPIRenielStore } from '../../config/data-source'

export const postCreateUser = async ({
  dataNewUser,
  showAlert,
  fetchAllAdminUsers,
  fetchAllUserUsers,
  toggle
}) => {
  const { _getAllAdminUsers } = fetchAllAdminUsers
  const { _getAllUserUsers } = fetchAllUserUsers

  await instanceAPIRenielStore
    .post('user/manager', dataNewUser, {
      headers: {
        service: 'create-user'
      }
    })
    .then(({ data }) => {
      if (data.result) {
        showAlert(data.message, 'success')
        _getAllAdminUsers && _getAllAdminUsers()
        _getAllUserUsers && _getAllUserUsers()
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
