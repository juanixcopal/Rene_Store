import { useState } from 'react'
import { postLogin } from '../../data/login/post'

export const useFetchInitLogin = () => {

    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    

    const [message, setMessage] = useState({
        message: '',
        result: true
    })

    const [isRegister, setIsRegister] = useState(false);

    const handleToggle = () => {
        setIsRegister(!isRegister);
    };

    const handleInput = event => {
        setLogin({ ...login, [event.target.name]: event.target.value })

        if (event.target.name === 'password') {
            setMessage({
                message: '',
                result: true
            })
        }
    }

    const loginAction = async e => {
        e.preventDefault()        
    
        await postLogin({ login })
          .then(({ token, result }) => {
            if (result) {
              localStorage.clear()
              localStorage.setItem('token', token)
              window.location.href = '/home'
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

    return{
        message,
        isRegister,
        handleInput,
        loginAction,
        handleToggle
    }
}