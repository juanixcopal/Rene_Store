import { createContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const token = localStorage.getItem('token')
    if (token) {
      return jwtDecode(token)
    } else {
      return ''
    }
  })

  const setToken = token => {
    localStorage.setItem('token', token)
    setAuthData(jwtDecode + token)
  }

  const rolAccess = { administrador: true, usuario: false }

  return (
    <AuthContext.Provider
      value={{
        authData,
        setToken,
        rolAccess
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
