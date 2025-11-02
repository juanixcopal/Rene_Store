import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import theme from './theme/index.js'
import AppBarInvitaPRO from './components/app-bar/index.js'
import RoutesInvitaPRO from './components/app-bar/routes'
import AuthProvider from './provider/global-provider.js'
// import { AlertProvider } from './provider/alert.provider'
import { AlertProvider } from './provider/alert-provider.js'

const App = () => {
  return (
    <BrowserRouter>
      <AppBarInvitaPRO>
        <AlertProvider>
          <RoutesInvitaPRO />
        </AlertProvider>
      </AppBarInvitaPRO>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </ThemeProvider>
)
