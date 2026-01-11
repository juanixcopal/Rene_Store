import {
  Grid,
  Typography,
  Button,
  Card,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip
} from '@mui/material'
import { useFetchInitUsers } from '../../../hooks/users'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'
import MainModal from './modal/index.js'

const UsersPage = () => {
  const mainHook = useFetchInitUsers()
  const { fetchAllAdminUsers, fetchAllUserUsers, toggle } = mainHook
  const { allAdminUsers } = fetchAllAdminUsers
  const { allUserUsers } = fetchAllUserUsers

  return (
    <>
      <MainModal useFetchInit={mainHook} />
      <Grid container spacing={2} sx={{ marginBottom: '30px', alignItems: 'center' }}>
        <Grid size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
          <Typography fontSize={22} fontWeight={500} color='#3E2F2F'>
            Usuarios
          </Typography>
        </Grid>

        <Grid
          size={{ lg: 6, md: 6, sm: 12, xs: 12 }}
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <Button variant='contained' onClick={() => toggle(null, 'Nuevo usuario', 'new-user')}>
            Crear usuario
          </Button>
        </Grid>
      </Grid>

      <Card sx={{ marginBottom: '20px' }}>
        Administradores
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Correo electrónico</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {allAdminUsers.map(item => {
                return (
                  <TableRow key={item._id}>
                    <TableCell>{item.user_name}</TableCell>
                    <TableCell>{item.user_lastname}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.rol_id.rol}</TableCell>
                    <TableCell>
                      <Tooltip title='Editar usuario' arrow>
                        <IconButton
                          sx={{ color: '#7B2D26', height: '30px', width: '30px' }}
                          onClick={() => toggle(null, 'Editar usuario', 'edit-user', item)}
                        >
                          <ModeEditOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Card>
        Usuarios
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Correo electrónico</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {allUserUsers.map(item => {
                return (
                  <TableRow key={item._id}>
                    <TableCell>{item.user_name}</TableCell>
                    <TableCell>{item.user_lastname}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.rol_id.rol}</TableCell>
                    <TableCell>
                      <IconButton
                        sx={{ color: '#7B2D26', height: '30px', width: '30px' }}
                        onClick={() => toggle(null, 'Editar usuario', 'edit-user', item)}
                      >
                        <ModeEditOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export default UsersPage
