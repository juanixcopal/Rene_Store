import {
  Box,
  Card,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import { useFetchDashboard } from '../../../hooks/dashboard/index.js'

const DashboarPage = () => {
  const mainHook = useFetchDashboard()
  const { fetchDashboardStats, fetchLastOrders } = mainHook
  const { stats } = fetchDashboardStats
  const { lastOrders } = fetchLastOrders

  return (
    <>
      <Box marginBottom={'20px'}>
        <Typography fontSize={22} fontWeight={500} color='#3E2F2F'>
          Dashboard
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ lg: 3, md: 12, sm: 12, xs: 12 }}>
          <Card>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box
                sx={{
                  backgroundColor: '#FFF5F4',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ShoppingCartOutlinedIcon sx={{ fontSize: 35, color: '#7B2D26' }} />
              </Box>
              <Box>
                <Typography fontSize={16} fontWeight={400} color='#3E2F2F'>
                  Total de pedidos realizados
                </Typography>
                <Typography fontSize={28} fontWeight={600} color='#3E2F2F'>
                  {stats?.totalOrders}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ lg: 3, md: 12, sm: 12, xs: 12 }}>
          <Card>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  backgroundColor: '#FFF5F4',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <AttachMoneyOutlinedIcon sx={{ fontSize: 35, color: '#7B2D26' }} />
              </Box>
              <Box>
                <Typography fontSize={16} fontWeight={400} color='#3E2F2F'>
                  Ganancias totales del día
                </Typography>
                <Typography fontSize={28} fontWeight={600} color='#3E2F2F'>
                  {stats?.totalRevenue} €
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ lg: 3, md: 12, sm: 12, xs: 12 }}>
          <Card>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  backgroundColor: '#FFF5F4',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Inventory2OutlinedIcon sx={{ fontSize: 35, color: '#7B2D26' }} />
              </Box>
              <Box>
                <Typography fontSize={16} fontWeight={400} color='#3E2F2F'>
                  Productos comprados
                </Typography>
                <Typography fontSize={28} fontWeight={600} color='#3E2F2F'>
                  {stats?.totalProducts}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ lg: 3, md: 12, sm: 12, xs: 12 }}>
          <Card>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  backgroundColor: '#FFF5F4',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <NotificationsNoneOutlinedIcon sx={{ fontSize: 35, color: '#7B2D26' }} />
              </Box>
              <Box>
                <Typography fontSize={16} fontWeight={400} color='#3E2F2F'>
                  Mensajes sin responder
                </Typography>
                <Typography fontSize={28} fontWeight={600} color='#3E2F2F'>
                  10
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: '20px' }}>
        <Grid size={{ lg: 8, md: 12, sm: 12, xs: 12 }}>
          <Card>
            Ultimos 5 pedidos
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID pedido</TableCell>
                    <TableCell>Nombre del cliente</TableCell>
                    <TableCell>Número de productos</TableCell>
                    <TableCell>Fecha de compra</TableCell>
                    <TableCell>Precio total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lastOrders.map(item => {
                    return (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.customerName}</TableCell>
                        <TableCell>{item.totalProducts}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.totalPrice} €</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        <Grid size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
          <Card>Productos con bajo stock</Card>
        </Grid>
      </Grid>
    </>
  )
}

export default DashboarPage
