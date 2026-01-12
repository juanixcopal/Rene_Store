import { instanceAPIRenielStoreGraphql } from '../../config/data-source'

export const getAllAdminUsers = async () => {
  const response = await instanceAPIRenielStoreGraphql.post('/graphql', {
    query: `
      query {
        getAllAdmins {
          _id
          user_name
          user_lastname
          email
          rol_id {
            _id
            rol
          }
        }
      }
    `
  })

  return {
    data: response.data.data.getAllAdmins
  }
}

export const getAllUserUsers = async () => {
  const response = await instanceAPIRenielStoreGraphql.post('/graphql', {
    query: `
      query {
        getAllUsers {
          _id
          user_name
          user_lastname
          email
          rol_id {
            _id
            rol
          }
        }
      }
    `
  })

  return {
    data: response.data.data.getAllUsers
  }
}

export const getAllRoles = async () => {
  const response = await instanceAPIRenielStoreGraphql.post('/graphql', {
    query: `
      query {
        getAllRoles {
          _id
          rol
        }
      }
    `
  })

  return {
    data: response.data.data.getAllRoles
  }
}
