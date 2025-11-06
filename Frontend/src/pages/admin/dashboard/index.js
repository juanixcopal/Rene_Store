import { Box, Card, Grid, Typography } from '@mui/material'

const DashboarPage = () => {
  return (
    <>
      <Box marginBottom={'20px'}>
        <Typography fontSize={22} fontWeight={500} color='#3E2F2F'>
          Dashboard
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ lg: 3, md: 12, sm: 12, xs: 12 }}>
          <Card>Total pedidos realizados</Card>
        </Grid>

        <Grid size={{ lg: 3, md: 12, sm: 12, xs: 12 }}>
          <Card>Ganancias totales</Card>
        </Grid>

        <Grid size={{ lg: 3, md: 12, sm: 12, xs: 12 }}>
          <Card>Productos comprados</Card>
        </Grid>

        <Grid size={{ lg: 3, md: 12, sm: 12, xs: 12 }}>
          <Card>Mensajes sin responder</Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: '20px' }}>
        <Grid size={{ lg: 8, md: 12, sm: 12, xs: 12 }}>
          <Card>Ultimos pedidos</Card>
        </Grid>

        <Grid size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
          <Card>Productos con bajo stock</Card>
        </Grid>
      </Grid>
    </>
  )
}

export default DashboarPage
