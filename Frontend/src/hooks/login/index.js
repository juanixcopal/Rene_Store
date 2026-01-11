import { useState } from 'react'
import { postLogin, postRegisterUser } from '../../data/login/post'

export const useFetchInitLogin = () => {
  const [login, setLogin] = useState({
    email: '',
    password: ''
  })

  const [message, setMessage] = useState({
    message: '',
    result: false
  })

  const [dataNewUser, setDataNewUser] = useState({
    user_name: '',
    user_lastname: '',
    email: '',
    password: '',
    repeat_password: ''
  })

  const [isRegister, setIsRegister] = useState(false)

  const handleToggle = () => {
    setIsRegister(!isRegister)
  }

  const handleInput = event => {
    setLogin({ ...login, [event.target.name]: event.target.value })

    if (event.target.name === 'password' || event.target.name === 'email') {
      setMessage({
        message: '',
        result: false
      })
    }
  }

  const handleInputNewUser = event => {
    setDataNewUser({ ...dataNewUser, [event.target.name]: event.target.value })
  }

  const loginAction = async e => {
    e.preventDefault()

    await postLogin({ login })
      .then(({ token, result, redirect, id }) => {
        if (result) {
          localStorage.clear()
          localStorage.setItem('token', token)
          localStorage.setItem('userId', id)
          window.location.href = redirect
        }
      })
      .catch(({ response }) => {
        if (response) {
          const { message, result } = response.data

          setMessage({
            message: message,
            result: result
          })
        } else {
          setMessage({
            message: 'No hay comunicación con los servicios, verifica tu internet',
            result: false
          })
        }
      })
  }

  const registerAction = async e => {
    e.preventDefault()

    await postRegisterUser({ dataNewUser })
      .then(({ token, result, redirect, id }) => {
        console.log(token)

        if (result) {
          localStorage.clear()
          localStorage.setItem('token', token)
          localStorage.setItem('userId', id)
          window.location.href = redirect
        }
      })
      .catch(({ response }) => {
        if (response) {
          const { message, result } = response.data

          setMessage({
            message: message,
            result: result
          })
        } else {
          setMessage({
            message: 'No hay comunicación con los servicios, verifica tu internet',
            result: false
          })
        }
      })
  }

  return {
    message,
    isRegister,
    handleInput,
    loginAction,
    handleToggle,
    handleInputNewUser,
    registerAction
  }
}
