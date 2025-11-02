import { useEffect, useState, useContext } from 'react'
import {
  Typography,
  IconButton,
  Box,
  Toolbar,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Popover,
  Divider,
  useTheme
} from '@mui/material'
import { AuthContext } from '../../provider/global-provider'
import { Link, useLocation, matchPath } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import MuiDrawer from '@mui/material/Drawer'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined'
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined'
import './index.css'

const publicRoutes = ['/login', '/login/']

const openedMixin = theme => ({
  width: 280,
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
  width: `calc(${theme.spacing(7)} - 3px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} - 3px)`
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  minHeight: '55px'
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1
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

const AppBarInvitaPRO = ({ children }) => {
  const theme = useTheme()
  const location = useLocation()
  const [anchorProfile, setAnchorProfile] = useState(null)
  const [activeItem, setActiveItem] = useState(location.pathname)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [open, setOpen] = useState(() => {
    const storedState = localStorage.getItem('open')
    return storedState !== null ? JSON.parse(storedState) : true
  })

  const { authData } = useContext(AuthContext)
  const { name, lastname } = authData

  const openProfile = Boolean(anchorProfile)

  const idProfile = openProfile ? 'popper-profile' : undefined

  const isPublic = publicRoutes.includes(currentPath)

  useEffect(() => {
    setActiveItem(location.pathname)
    // eslint-disable-next-line
  }, [location?.pathname])

  useEffect(() => {
    setCurrentPath(window.location.pathname)
    // eslint-disable-next-line
  }, [window.location.pathname])

  const handleOpen = () => {
    setOpen(prevOpen => {
      const newOpenState = !prevOpen
      localStorage.setItem('open', JSON.stringify(newOpenState))
      return newOpenState
    })
  }

  const handleLogout = (event, route = '') => {
    setAnchorProfile(null)

    localStorage.clear()
    if (route && route !== '') {
      window.location.href = `/${route}`
    }
  }

  const handleProfile = event => {
    setAnchorProfile(anchorProfile ? null : event.currentTarget)
  }

  return (
    <>
      {isPublic ? (
        <>{children}</>
      ) : (
        <>
          <Box sx={{ display: 'flex' }}>
            <AppBar position='fixed' open={open}>
              <Toolbar>
                <IconButton sx={{ mr: '24px' }} onClick={handleOpen}>
                  <MenuIcon
                    sx={{
                      color: theme => theme.palette.neutral.white,
                      width: '24px',
                      height: '24px'
                    }}
                  />
                </IconButton>
                <Typography
                  sx={{
                    color: theme => theme.palette.neutral.white,
                    fontSize: '18px',
                    fontWeight: 600,
                    flexGrow: 1
                  }}
                >
                  InvitaPRO
                </Typography>

                <IconButton onClick={handleProfile}>
                  <AccountCircleIcon
                    sx={{
                      color: theme => theme.palette.neutral.white,
                      width: '24px',
                      height: '24px'
                    }}
                  />
                </IconButton>
                <Popover
                  id={idProfile}
                  open={openProfile}
                  anchorEl={anchorProfile}
                  onClose={handleProfile}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                >
                  <Card
                    sx={{
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      minWidth: '180px'
                    }}
                  >
                    <div className='container-popover-profile'>
                      <div className='container-information-user'>
                        <Typography
                          sx={{
                            fontSize: '15px',
                            fontWeight: 600
                          }}
                        >
                          {name} {lastname}
                        </Typography>
                      </div>
                      <Divider sx={{ paddingTop: '8px' }} />
                      <div
                        className='container-logout'
                        onClick={event => handleLogout(event, 'login')}
                      >
                        <ExitToAppOutlinedIcon
                          sx={{
                            color: theme => theme.palette.neutral[800],
                            width: '24px',
                            height: '24px'
                          }}
                        />

                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: 700
                          }}
                        >
                          Cerrar Sesión
                        </Typography>
                      </div>
                    </div>
                  </Card>
                </Popover>
              </Toolbar>
            </AppBar>
            <Drawer variant='permanent' open={open}>
              <DrawerHeader />
              <List>
                <ListItem disablePadding>
                  <Link
                    to='/list-events'
                    style={{ textDecoration: 'none', color: theme.palette.neutral[800] }}
                  >
                    <ListItemButton
                      sx={{
                        background:
                          activeItem === '/list-events' ||
                          matchPath('/tickets/details-ticket/:id', activeItem)
                            ? theme.palette.informative[50]
                            : 'none'
                      }}
                    >
                      <ListItemIcon>
                        <EventAvailableOutlinedIcon
                          sx={{
                            height: '24px',
                            width: '24px',
                            color:
                              activeItem === '/list-events' ||
                              matchPath('/list-events/details-event/:id', activeItem)
                                ? theme.palette.primary[900]
                                : theme.palette.neutral[800]
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography
                          color={
                            activeItem === '/list-events' ||
                            matchPath('/list-events/details-event/:id', activeItem)
                              ? theme.palette.primary[900]
                              : 'none'
                          }
                          fontWeight={
                            activeItem === '/list-events' ||
                            matchPath('/list-events/details-event/:id', activeItem)
                              ? 600
                              : 'none'
                          }
                        >
                          Eventos
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </Link>
                  <Link
                    to='/users'
                    style={{ textDecoration: 'none', color: theme.palette.neutral[800] }}
                  >
                    <ListItemButton
                      sx={{
                        background: activeItem === '/users' ? theme.palette.informative[50] : 'none'
                      }}
                    >
                      <ListItemIcon>
                        <SupervisedUserCircleOutlinedIcon
                          sx={{
                            height: '24px',
                            width: '24px',
                            color:
                              activeItem === '/users'
                                ? theme.palette.primary[900]
                                : theme.palette.neutral[800]
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography
                          color={activeItem === '/users' ? theme.palette.primary[900] : 'none'}
                          fontWeight={activeItem === '/users' ? 600 : 'none'}
                        >
                          Usuarios
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
              </List>
            </Drawer>
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader />
              {children}
            </Box>
          </Box>
        </>
      )}
    </>
  )
}

export default AppBarInvitaPRO
