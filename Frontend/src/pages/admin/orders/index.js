import { Box, Typography, Grid, Card } from '@mui/material'
import { useFetchInitAdminOrders } from '../../../hooks/admin-orders'

const AdminOrdersPage = () => {
  const mainHook = useFetchInitAdminOrders()
  const { fetchAllOrders } = mainHook
  const { allOrders } = fetchAllOrders

  return (
    <>
      <Box marginBottom={'20px'}>
        <Typography fontSize={22} fontWeight={500} color='#3E2F2F'>
          Pedidos
        </Typography>
      </Box>

      {!allOrders || allOrders.length === 0 ? (
        <Box sx={{ textAlign: 'center' }}>
          <Typography fontSize={20} fontWeight={500} sx={{ color: '#8B7B7B' }}>
            No hay pedidos registrados
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {allOrders.map(order => (
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }} key={order._id}>
              <Card sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    pb: 2,
                    borderBottom: '2px solid #E8DDD8'
                  }}
                >
                  <Box>
                    <Typography fontSize={14} fontWeight={500} sx={{ color: '#8B7B7B', mb: 0.5 }}>
                      Pedido #{order._id}
                    </Typography>
                    <Typography fontSize={16} fontWeight={500} sx={{ color: '#3E2F2F' }}>
                      Fecha: {order.createdAt}
                    </Typography>
                    <Typography fontSize={16} fontWeight={500} sx={{ color: '#3E2F2F', mt: 0.5 }}>
                      Cliente: {order.user_name} {order.user_lastname}
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: 'right' }}>
                    <Typography fontSize={14} fontWeight={500} sx={{ color: '#8B7B7B', mb: 0.5 }}>
                      Total del pedido
                    </Typography>
                    <Typography fontSize={24} fontWeight={700} sx={{ color: '#7B2D26' }}>
                      {order.total.toFixed(2)} €
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  {order.items.map(item => (
                    <Grid size={{ lg: 3, md: 6, sm: 6, xs: 12 }} key={item._id}>
                      <Card>
                        <Box
                          sx={{
                            width: '100%',
                            height: '250px',
                            overflow: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#F9F9F9'
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </Box>

                        <Box sx={{ p: 2 }}>
                          <Typography
                            fontSize={18}
                            fontWeight={500}
                            sx={{
                              color: '#3E2F2F',
                              mb: 0.5,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {item.name}
                          </Typography>

                          <Typography
                            fontSize={15}
                            fontWeight={400}
                            sx={{
                              color: '#3E2F2F',
                              mb: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical'
                            }}
                          >
                            {item.description}
                          </Typography>

                          <Typography
                            fontSize={14}
                            fontWeight={500}
                            sx={{ color: '#8B7B7B', mb: 0.5 }}
                          >
                            Categoría: {item.category} ({item.gender})
                          </Typography>

                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <Typography fontSize={16} fontWeight={600}>
                              {item.price} €
                            </Typography>
                            <Typography fontSize={14} fontWeight={500} sx={{ color: '#7B2D26' }}>
                              x{item.quantity}
                            </Typography>
                          </Box>

                          <Typography
                            fontSize={18}
                            fontWeight={700}
                            sx={{ mt: 1, color: '#3E2F2F' }}
                          >
                            Subtotal: {item.subtotal.toFixed(2)} €
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}

export default AdminOrdersPage
