import { useState, useEffect, useContext } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  styled,
  Card,
  Divider,
  Popover,
  Tooltip
} from '@mui/material'
import { Link } from 'react-router-dom'

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import { AuthContext } from '../../provider/global-provider'

const NavButton = styled(Button)(() => ({
  color: '#3E2F2F',
  textTransform: 'none',
  fontSize: '15px',
  padding: '8px 20px',
  borderRadius: 0,
  fontFamily: 'Playfair Display',
  fontWeight: 500
}))

const publicRoutes = ['/login', '/login/']

const UserAppBar = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [anchorProfile, setAnchorProfile] = useState(null)
  const { authData } = useContext(AuthContext)
  const { user_name, user_lastname } = authData

  const menuItems = [
    { id: 'home', label: 'Inicio', path: '/home' },
    { id: 'man', label: 'Hombre', path: '/man' },
    { id: 'woman', label: 'Mujer', path: '/woman' },
    { id: 'orders', label: 'Pedidos', path: '/orders' }
  ]

  const isPublic = publicRoutes.includes(currentPath)

  useEffect(() => {
    setCurrentPath(window.location.pathname)
    // eslint-disable-next-line
  }, [window.location.pathname])

  const openProfile = Boolean(anchorProfile)
  const idProfile = openProfile ? 'popover-profile' : undefined

  const handleProfile = event => {
    setAnchorProfile(anchorProfile ? null : event.currentTarget)
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/login'
  }

  return (
    <>
      {isPublic ? (
        <>{children}</>
      ) : (
        <>
          <AppBar
            position='sticky'
            elevation={1}
            sx={{
              backgroundColor: '#FAF9F8',
              color: '#3E2F2F'
            }}
          >
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  component={Link}
                  to='/home'
                  sx={{
                    fontWeight: 600,
                    fontSize: '23px',
                    color: '#3E2F2F',
                    textDecoration: 'none',
                    fontFamily: 'Playfair Display'
                  }}
                >
                  Rene Store
                </Typography>
              </Box>

              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' }
                }}
              >
                {menuItems.map(item => (
                  <NavButton key={item.id} component={Link} to={item.path}>
                    {item.label}
                  </NavButton>
                ))}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton component={Link} to='/cart' sx={{ color: '#7B2D26' }}>
                  <Tooltip title='Carrito' arrow>
                    <ShoppingCartOutlinedIcon />
                  </Tooltip>
                </IconButton>

                <IconButton component={Link} to='/chat' sx={{ color: '#7B2D26' }}>
                  <Tooltip title='Soporte' arrow>
                    <SupportAgentIcon />
                  </Tooltip>
                </IconButton>

                <IconButton onClick={handleProfile}>
                  <AccountCircleOutlinedIcon sx={{ color: '#7B2D26' }} />
                </IconButton>

                <Popover
                  id={idProfile}
                  open={openProfile}
                  anchorEl={anchorProfile}
                  onClose={handleProfile}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <Card
                    sx={{
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      minWidth: '180px',
                      borderRadius: '5px'
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, fontSize: 14, color: '3E2F2F' }}>
                      {user_name} {user_lastname}
                    </Typography>
                    <Divider />
                    <Box
                      onClick={handleLogout}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#7B2D26'
                        }
                      }}
                    >
                      <ExitToAppOutlinedIcon sx={{ fontSize: 20 }} />
                      <Typography sx={{ fontSize: 14, fontWeight: 500, color: '3E2F2F' }}>
                        Cerrar sesión
                      </Typography>
                    </Box>
                  </Card>
                </Popover>
              </Box>
            </Toolbar>
          </AppBar>
          <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            {children}
          </Box>
        </>
      )}
    </>
  )
}

export default UserAppBar
