import { useState } from 'react'
import { useFetchAllAdminUsers, useFetchAllUserUsers, useFetchAllRoles } from './fetch-data'
import { defaultDataModal, defaultDataUser } from './default-data.js'
import { useActions } from './actions.js'

export const useFetchInitUsers = () => {
  const [dataModal, setDataModal] = useState(defaultDataModal)
  const [dataNewUser, setDataNewUser] = useState(defaultDataUser)
  const [dataUpdateUser, setDataUpdateUser] = useState([])

  const fetchAllAdminUsers = useFetchAllAdminUsers()
  const fetchAllUserUsers = useFetchAllUserUsers()
  const fetchAllRoles = useFetchAllRoles()

  const toggle = (_, title, component, params) => {
    setDataModal({
      ...dataModal,
      open: !dataModal.open,
      title,
      component,
      params
    })
    setDataNewUser(defaultDataUser)
  }

  const onClose = (_, title, component, params) => {
    setDataModal({
      ...dataModal,
      open: !dataModal.open,
      title,
      component,
      params
    })
    setDataNewUser(defaultDataUser)
  }

  const handleInputNewUser = event => {
    setDataNewUser({ ...dataNewUser, [event.target.name]: event.target.value })
  }

  const handleChangeDataUser = formData => {
    setDataUpdateUser(formData)
  }

  const actions = useActions({
    dataNewUser,
    fetchAllAdminUsers,
    fetchAllUserUsers,
    toggle,
    dataUpdateUser
  })

  return {
    fetchAllAdminUsers,
    fetchAllUserUsers,
    fetchAllRoles,
    dataModal,
    dataNewUser,
    handleInputNewUser,
    handleChangeDataUser,
    toggle,
    onClose,
    actions
  }
}
