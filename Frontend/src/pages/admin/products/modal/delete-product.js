import { Typography, Button, Box, Grid } from '@mui/material'

const DeleteProduct = ({ useFetchInit }) => {
  const { dataModal, onClose, actions } = useFetchInit
  const { params } = dataModal
  const { deleteProduct } = actions

  return (
    <>
      <form onSubmit={deleteProduct}>
        <Grid container spacing={'16px'} sx={{ paddingTop: '10px' }}>
          <Grid size={{ lg: 18, md: 12, sm: 12, xs: 12 }}>
            <Typography fontSize='14px' fontWeight={400} color='#424242'>
              El producto {params.name} será dada de baja y sus datos quedarán eliminados
              completamente del sistema
            </Typography>
          </Grid>

          <Grid size={{ lg: 12, md: 6, sm: 6, xs: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant='text' sx={{ color: '#3E2F2F' }} onClick={onClose}>
                Cancelar
              </Button>
              <Button variant='text' type='submit'>
                Eliminar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default DeleteProduct
