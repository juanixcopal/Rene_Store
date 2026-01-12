import { instanceAPIRenielStoreGraphql } from '../../config/data-source'

export const putEditUser = async ({
  dataUpdateUser,
  showAlert,
  fetchAllAdminUsers,
  fetchAllUserUsers,
  toggle
}) => {
  const { _getAllAdminUsers } = fetchAllAdminUsers
  const { _getAllUserUsers } = fetchAllUserUsers

  await instanceAPIRenielStoreGraphql
    .post('/graphql', {
      query: `
        mutation UpdateUser($input: UpdateUserInput!) {
          updateUser(input: $input) {
            result
            message
            user {
              _id
              user_name
              user_lastname
              email
            }
          }
        }
      `,
      variables: {
        input: {
          email: dataUpdateUser.email,
          user_name: dataUpdateUser.user_name,
          user_lastname: dataUpdateUser.user_lastname,
          rol: dataUpdateUser.rol
        }
      }
    })
    .then(({ data }) => {
      const result = data.data.updateUser

      if (result.result) {
        showAlert(result.message, 'success')
        _getAllAdminUsers && _getAllAdminUsers()
        _getAllUserUsers && _getAllUserUsers()
        toggle && toggle()
      } else {
        showAlert(result.message, 'warning')
      }
    })
    .catch(error => {
      console.log('ERROR', error)
      showAlert('Error interno, estamos trabajando para mejorar el sistema', 'warning')
    })
}
