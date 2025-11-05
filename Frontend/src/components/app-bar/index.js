import { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Button,
  Badge,
  styled,
  alpha
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Link } from 'react-router-dom'

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

// Styled component para la barra de búsqueda
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '15px',
  backgroundColor: '#EFEFEF',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1)
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#7B2D26'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#3E2F2F',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`
  }
}))

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

const RenielStoreAppBar = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

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
              {/* Logo */}
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
                  Reniel Store
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
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase placeholder='Buscar' inputProps={{ 'aria-label': 'search' }} />
                </Search>

                <IconButton component={Link} to='/carrito' sx={{ color: '#D8A39D' }}>
                  <Badge badgeContent={0} color='secondary'>
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </IconButton>

                <IconButton component={Link} to='/favoritos' sx={{ color: '#D8A39D' }}>
                  <FavoriteBorderOutlinedIcon />
                </IconButton>

                <IconButton component={Link} to='/carrito' sx={{ color: '#D8A39D' }}>
                  <Badge badgeContent={0} color='secondary'>
                    <NotificationsNoneOutlinedIcon />
                  </Badge>
                </IconButton>

                <IconButton component={Link} to='/perfil' sx={{ color: '#D8A39D' }}>
                  <AccountCircleOutlinedIcon />
                </IconButton>
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

export default RenielStoreAppBar
