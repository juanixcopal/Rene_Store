import { useEffect, useState } from 'react'
import { getAllAdminUsers, getAllUserUsers, getAllRoles } from '../../data/users/get'
import ExecutionPermit from '../../helpers/execution-permit-helper'

export const useFetchAllAdminUsers = () => {
  const [allAdminUsers, setAllAdminUsers] = useState([])

  const _getAllAdminUsers = async () => {
    try {
      await getAllAdminUsers()
        .then(({ data }) => {
          setAllAdminUsers(data)
        })
        .catch(({ response }) => {
          ExecutionPermit({ response })
        })
    } catch (error) {
      console.log('Error en _getAllAdminUsers', error)
    }
  }

  useEffect(() => {
    _getAllAdminUsers()
  }, [])

  return { allAdminUsers, _getAllAdminUsers }
}

export const useFetchAllUserUsers = () => {
  const [allUserUsers, setAllUserUsers] = useState([])

  const _getAllUserUsers = async () => {
    try {
      await getAllUserUsers()
        .then(({ data }) => {
          setAllUserUsers(data)
        })
        .catch(({ response }) => {
          ExecutionPermit({ response })
        })
    } catch (error) {
      console.log('Error en _getAllUserUsers', error)
    }
  }

  useEffect(() => {
    _getAllUserUsers()
  }, [])

  return { allUserUsers, _getAllUserUsers }
}

export const useFetchAllRoles = () => {
  const [allRoles, setAllRoles] = useState([])

  useEffect(() => {
    ;(async () => {
      await getAllRoles()
        .then(({ data }) => {
          setAllRoles(data)
        })
        .catch(({ response }) => {
          ExecutionPermit({ response })
        })
    })()
  }, [])

  return { allRoles }
}
