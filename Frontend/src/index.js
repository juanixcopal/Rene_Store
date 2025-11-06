import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import theme from './theme/index.js'
import AuthProvider from './provider/global-provider.js'
import { AlertProvider } from './provider/alert-provider.js'

import UserAppBar from './components/user-app-bar/index.js'
import UserRoutes from './components/user-app-bar/routes.js'

import AdminAppBar from './components/admin-app-bar/index.js'
import AdminRoutes from './components/admin-app-bar/routes.js'

const App = () => {
  const isAdminRoute = window.location.pathname.startsWith('/admin')

  // return (
  //   <BrowserRouter>
  //     <UserAppBar>
  //       <AlertProvider>
  //         <UserRoutes />
  //       </AlertProvider>
  //     </UserAppBar>
  //   </BrowserRouter>
  // )

  return (
    <BrowserRouter>
      <AlertProvider>
        {isAdminRoute ? (
          <AdminAppBar>
            <AdminRoutes />
          </AdminAppBar>
        ) : (
          <UserAppBar>
            <UserRoutes />
          </UserAppBar>
        )}
      </AlertProvider>
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
