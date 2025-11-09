import { instanceAPIRenielStore } from '../../config/data-source'

export const putEditUser = async ({
  dataUpdateUser,
  showAlert,
  fetchAllAdminUsers,
  fetchAllUserUsers,
  toggle
}) => {
  const { _getAllAdminUsers } = fetchAllAdminUsers
  const { _getAllUserUsers } = fetchAllUserUsers

  await instanceAPIRenielStore
    .put('user/manager', dataUpdateUser, {
      headers: {
        service: 'edit-user'
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
