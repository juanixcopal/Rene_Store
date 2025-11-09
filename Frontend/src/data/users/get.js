import { instanceAPIRenielStore } from '../../config/data-source'

export const getAllAdminUsers = async () => {
  return await instanceAPIRenielStore.get('/user/query', {
    headers: {
      service: 'all-admin-users'
    }
  })
}

export const getAllUserUsers = async () => {
  return await instanceAPIRenielStore.get('/user/query', {
    headers: {
      service: 'all-user-users'
    }
  })
}

export const getAllRoles = async () => {
  return await instanceAPIRenielStore.get('/rol/query', {
    headers: {
      service: 'all-rol'
    }
  })
}
