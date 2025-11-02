import { useState } from 'react'
import { postLogin } from '../../data/login/post'

export const useFetchInitLogin = () => {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [login, setLogin] = useState({
    username: '',
    password: ''
  })
  const [message, setMessage] = useState({
    message: '',
    result: true
  })

  const handleNextStep = () => {
    if (step === 1 && login.username) {
      setStep(2)
    }
  }

  const handleBackStep = () => {
    setStep(1)
    setLogin({
      username: '',
      password: ''
    })
  }

  const handleInput = event => {
    setLogin({ ...login, [event.target.name]: event.target.value })

    if (event.target.name === 'password') {
      setMessage({
        message: '',
        result: true
      })
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const loginAction = async e => {
    e.preventDefault()

    await postLogin({ login })
      .then(({ token, result }) => {
        if (result) {
          localStorage.clear()
          localStorage.setItem('token', token)
          window.location.href = '/list-events'
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
    step,
    login,
    showPassword,
    message,
    handleNextStep,
    handleBackStep,
    handleInput,
    handleShowPassword,
    loginAction
  }
}
