import { Grid, TextField, Box, Button, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'

const EditUser = ({ useFetchInit }) => {
  const { dataModal, onClose, handleChangeDataUser, fetchAllRoles, actions } = useFetchInit
  const { params } = dataModal
  const { allRoles } = fetchAllRoles
  const { editUser } = actions

  const [defaultDataUser, setDefaultDataUser] = useState({
    user_name: params.user_name,
    user_lastname: params.user_lastname,
    email: params.email,
    rol: params.rol_id.rol
  })

  const handleChange = event => {
    const { name, value } = event.target

    setDefaultDataUser(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  useEffect(() => {
    handleChangeDataUser(defaultDataUser)
  }, [defaultDataUser, handleChangeDataUser])

  return (
    <>
      <form onSubmit={editUser}>
        <Grid container spacing={'16px'} sx={{ paddingTop: '10px' }}>
          <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
            <TextField
              label='Nombres'
              name='user_name'
              defaultValue={params.user_name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
            <TextField
              label='Apellidos'
              name='user_lastname'
              defaultValue={params.user_lastname}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
            <TextField
              label='Correo electrónico'
              name='email'
              defaultValue={params.email}
              disabled
              required
            />
          </Grid>

          <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
            <TextField
              label='Rol'
              name='rol'
              defaultValue={params.rol_id.rol}
              onChange={handleChange}
              select
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
                Guardar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default EditUser
