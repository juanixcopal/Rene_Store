import { createContext, useContext, useState, useCallback } from 'react'
import { Alert } from '@mui/material'

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: '' // 'success', 'error', 'warning', 'info'
  })

  const handleClose = () => {
    setAlert({ ...alert, open: false })
  }

  const showAlert = useCallback((message, severity = 'success') => {
    setAlert({ open: true, message, severity })

    setTimeout(() => {
      setAlert({ ...alert, open: false })
    }, 2000)
    // eslint-disable-next-line
  }, [])

  return (
    <AlertContext.Provider value={showAlert}>
      {alert.open && (
        <div style={{ marginBottom: '20px' }}>
          <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </div>
      )}
      {children}
    </AlertContext.Provider>
  )
}

export const useAlert = () => useContext(AlertContext)
