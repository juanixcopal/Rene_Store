import { Grid, TextField, Box, Button, MenuItem } from '@mui/material'

const NewUser = ({ useFetchInit }) => {
  const { onClose, fetchAllRoles, dataNewUser, handleInputNewUser, actions } = useFetchInit
  const { allRoles } = fetchAllRoles
  const { createNewUser } = actions

  return (
    <>
      <form onSubmit={createNewUser}>
        <Grid container spacing={'16px'} sx={{ paddingTop: '10px' }}>
          <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
            <TextField label='Nombres' name='user_name' onChange={handleInputNewUser} required />
          </Grid>

          <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
            <TextField
              label='Apellidos'
              name='user_lastname'
              onChange={handleInputNewUser}
              required
            />
          </Grid>

          <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
            <TextField
              label='Correo electrónico'
              name='email'
              onChange={handleInputNewUser}
              required
            />
          </Grid>

          <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
            <TextField
              label='Contraseña'
              name='password'
              type='password'
              onChange={handleInputNewUser}
              required
            />
          </Grid>

          <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
            <TextField
              label='Repetir contraseña'
              name='repeat_password'
              type='password'
              onChange={handleInputNewUser}
              required
            />
          </Grid>

          <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
            <TextField
              label='Rol'
              name='rol'
              onChange={handleInputNewUser}
              select
              value={dataNewUser.rol || ''}
              required
            >
              {allRoles.map(item => {
                return (
                  <MenuItem key={item._id} id={item._id} value={item.rol}>
                    {item.rol}
                  </MenuItem>
                )
              })}
            </TextField>
          </Grid>

          <Grid size={{ lg: 12, md: 6, sm: 6, xs: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant='text' sx={{ color: '#3E2F2F' }} onClick={onClose}>
                Cancelar
              </Button>
              <Button variant='text' type='submit'>
                Crear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default NewUser
