import { useAlert } from '../../provider/alert-provider'
import { postCreateUser } from '../../data/users/post.js'
import { putEditUser } from '../../data/users/put.js'

export const useActions = ({
  dataNewUser,
  fetchAllAdminUsers,
  fetchAllUserUsers,
  toggle,
  dataUpdateUser
}) => {
  const showAlert = useAlert()

  const createNewUser = async e => {
    e.preventDefault()
    postCreateUser({ dataNewUser, fetchAllAdminUsers, fetchAllUserUsers, showAlert, toggle })
  }

  const editUser = async e => {
    e.preventDefault()
    putEditUser({ dataUpdateUser, fetchAllAdminUsers, fetchAllUserUsers, showAlert, toggle })
  }

  return {
    createNewUser,
    editUser
  }
}
