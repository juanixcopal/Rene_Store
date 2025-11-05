import { Box, Button, Card, Grid, Typography, IconButton } from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

const CartPage = () => {
  return (
    <>
      <Box marginBottom={'30px'}>
        <Typography fontSize={40} fontWeight={400}>
          Cesta
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ lg: 7, md: 12, sm: 12, xs: 12 }}>
          {/* aqui meter el .map de los productos (incluye toda la card) */}
          <Card sx={{ marginBottom: '20px' }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 3, sm: 2 }}>
                <Box
                  component='img'
                  src='https://res.cloudinary.com/drch5a3kf/image/upload/v1762126553/reniel_store/products/t2ijdxwht8fljilgx86c.jpg'
                  alt='Producto'
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    objectFit: 'cover'
                  }}
                />
              </Grid>

              <Grid size={{ xs: 9, sm: 6 }}>
                <Typography fontSize={18} fontWeight={500} sx={{ color: '#3E2F2F', mb: 0.5 }}>
                  Nombre producto
                </Typography>
                <Typography fontSize={16} fontWeight={500} sx={{ color: '#3E2F2F', mb: 0.5 }}>
                  Categoría
                </Typography>
                <Typography fontSize={15} fontWeight={500} sx={{ color: '#3E2F2F' }}>
                  Descripción
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'flex-start', sm: 'flex-end' },
                    height: '100%',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography fontSize={18} fontWeight={500}>
                    Precio €
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      border: '1px solid #7B2D26',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}
                  >
                    <IconButton
                      size='small'
                      sx={{
                        borderRadius: 0,
                        color: '#7B2D26',
                        '&:hover': { backgroundColor: '#FFF5F4' }
                      }}
                    >
                      <DeleteOutlineOutlinedIcon fontSize='small' />
                    </IconButton>

                    <Typography
                      sx={{
                        px: 2,
                        fontSize: 16,
                        fontWeight: 500,
                        minWidth: '40px',
                        textAlign: 'center'
                      }}
                    >
                      1
                    </Typography>

                    <IconButton
                      size='small'
                      sx={{
                        borderRadius: 0,
                        color: '#7B2D26',
                        '&:hover': { backgroundColor: '#FFF5F4' }
                      }}
                    >
                      <AddOutlinedIcon fontSize='small' />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid size={{ lg: 5, md: 12, sm: 12, xs: 12 }}>
          <Card>
            <Typography fontSize={24} fontWeight={400} sx={{ color: '3E2F2F' }}>
              Resumen
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography fontSize={18} fontWeight={500} sx={{ color: '#3E2F2F' }}>
                  Nombre producto
                </Typography>
                <Typography fontSize={18} fontWeight={500} sx={{ color: '#3E2F2F' }}>
                  Precio
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: '1px solid #E8DDD8',
                borderBottom: '1px solid #E8DDD8',
                paddingTop: '20px',
                paddingBottom: '20px',
                marginBottom: '20px'
              }}
            >
              <Typography fontSize={18} fontWeight={500} sx={{ color: '#3E2F2F' }}>
                Total
              </Typography>
              <Typography fontSize={18} fontWeight={500} sx={{ color: '#3E2F2F' }}>
                Precio total
              </Typography>
            </Box>

            <Button variant='contained'>Realizar pedido</Button>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default CartPage
