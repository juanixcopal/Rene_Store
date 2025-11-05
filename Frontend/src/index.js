import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import theme from './theme/index.js'
import RoutesRenielStore from './components/app-bar/routes.js'
import AuthProvider from './provider/global-provider.js'
import { AlertProvider } from './provider/alert-provider.js'
import RenielStoreAppBar from './components/app-bar/index.js'

const App = () => {
  return (
    <BrowserRouter>
      <RenielStoreAppBar>
        <AlertProvider>
          <RoutesRenielStore />
        </AlertProvider>
      </RenielStoreAppBar>
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
