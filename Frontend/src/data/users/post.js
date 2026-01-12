import { instanceAPIRenielStoreGraphql } from '../../config/data-source'

export const postCreateUser = async ({
  dataNewUser,
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
        mutation CreateUser($input: CreateUserInput!) {
          createUser(input: $input) {
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
          user_name: dataNewUser.user_name,
          user_lastname: dataNewUser.user_lastname,
          email: dataNewUser.email,
          password: dataNewUser.password,
          rol: dataNewUser.rol
        }
      }
    })
    .then(({ data }) => {
      const result = data.data.createUser

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
