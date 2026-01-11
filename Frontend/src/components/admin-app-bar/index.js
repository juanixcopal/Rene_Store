import { useContext, useEffect, useState } from 'react'
import {
  Typography,
  IconButton,
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Card,
  Divider,
  Popover
} from '@mui/material'
import { Link, useLocation, matchPath } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import MuiDrawer from '@mui/material/Drawer'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import { AuthContext } from '../../provider/global-provider.js'

const openedMixin = theme => ({
  width: 260,
  backgroundColor: '#F9F6F5',
  color: '#3E2F2F',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(9)} - 10px)`,
  backgroundColor: '#F9F6F5',
  color: '#3E2F2F'
})

const DrawerHeader = styled('div')(({ theme }) => ({
  minHeight: '55px'
}))

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#FAF9F8',
  color: '#3E2F2F'
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    width: 260,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
)

const AdminAppBar = ({ children }) => {
  const location = useLocation()
  const [anchorProfile, setAnchorProfile] = useState(null)
  const [activeItem, setActiveItem] = useState(location.pathname)
  const [open, setOpen] = useState(true)

  const { authData } = useContext(AuthContext)
  const { user_name, user_lastname } = authData

  const openProfile = Boolean(anchorProfile)
  const idProfile = openProfile ? 'popover-profile' : undefined

  useEffect(() => {
    setActiveItem(location.pathname)
  }, [location.pathname])

  const handleOpen = () => setOpen(!open)

  const handleProfile = event => {
    setAnchorProfile(anchorProfile ? null : event.currentTarget)
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/login'
  }

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: <DashboardOutlinedIcon />
    },
    {
      id: 'products',
      label: 'Productos',
      path: '/admin/products',
      icon: <ShoppingBagOutlinedIcon />
    },
    { id: 'orders', label: 'Pedidos', path: '/admin/orders', icon: <ReceiptLongOutlinedIcon /> },
    { id: 'chat', label: 'Chat', path: '/admin/chats', icon: <ChatOutlinedIcon /> },
    { id: 'users', label: 'Usuarios', path: '/admin/users', icon: <GroupOutlinedIcon /> }
  ]

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar position='fixed' open={open} elevation={1}>
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton sx={{ mr: 2 }} onClick={handleOpen}>
                <MenuIcon sx={{ color: '#7B2D26' }} />
              </IconButton>
              <Typography
                component={Link}
                to='/admin/dashboard'
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

            <Typography
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                fontWeight: 500,
                fontSize: '18px',
                color: '#3E2F2F'
              }}
            >
              Panel de administración
            </Typography>

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
          </Toolbar>
        </AppBar>

        <Drawer variant='permanent' open={open}>
          <DrawerHeader />
          <List>
            {menuItems.map(item => (
              <Link
                key={item.id}
                to={item.path}
                style={{ textDecoration: 'none', color: '#3E2F2F' }}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      borderRadius: '10px',
                      m: 0.5,
                      backgroundColor:
                        activeItem === item.path || matchPath(`${item.path}/*`, activeItem)
                          ? 'rgba(123, 45, 38, 0.1)'
                          : 'transparent'
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: '#7B2D26'
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight:
                          activeItem === item.path || matchPath(`${item.path}/*`, activeItem)
                            ? 700
                            : 400,
                        color: '#3E2F2F'
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>

        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </>
  )
}

export default AdminAppBar
