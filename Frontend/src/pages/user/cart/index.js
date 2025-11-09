import { Box, Button, Card, Grid, Typography, IconButton } from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import RemoveIcon from '@mui/icons-material/Remove'
import { useFetchInitCart } from '../../../hooks/cart/index.js'

const CartPage = () => {
  const cartHook = useFetchInitCart()
  const {
    fetchProductsInCart,
    handleChangeIncreaseQuantityProduct,
    handleChangeDecreaseQuantityProduct,
    fetchCartSummary,
    actions
  } = cartHook

  const { productsInCart } = fetchProductsInCart
  const { cartSummary } = fetchCartSummary

  const { buyCart } = actions

  return (
    <>
      <Box marginBottom={'30px'}>
        <Typography fontSize={40} fontWeight={400}>
          Cesta
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {!productsInCart || productsInCart.length === 0 ? (
          <>
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Typography fontSize={20} fontWeight={500} sx={{ color: '#8B7B7B' }}>
                Tu carrito está vacío
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Grid size={{ lg: 7, md: 12, sm: 12, xs: 12 }}>
              {productsInCart
                .filter(item => item?.product_id)
                .map(item => {
                  const { product_id } = item
                  return (
                    <Card sx={{ marginBottom: '20px' }} key={item._id}>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 3, sm: 2 }}>
                          <Box
                            component='img'
                            src={product_id.image}
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
                          <Typography
                            fontSize={18}
                            fontWeight={500}
                            sx={{ color: '#3E2F2F', mb: 0.5 }}
                          >
                            {product_id.name}
                          </Typography>
                          <Typography
                            fontSize={16}
                            fontWeight={500}
                            sx={{ color: '#3E2F2F', mb: 0.5 }}
                          >
                            {product_id.category_id.product}
                          </Typography>
                          <Typography fontSize={15} fontWeight={500} sx={{ color: '#3E2F2F' }}>
                            {product_id.description}
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
                              {product_id.price} €
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
                              {item.quantity === 1 && (
                                <>
                                  <IconButton
                                    size='small'
                                    sx={{
                                      borderRadius: 0,
                                      color: '#7B2D26',
                                      '&:hover': { backgroundColor: '#FFF5F4' }
                                    }}
                                    onClick={() =>
                                      handleChangeDecreaseQuantityProduct(product_id._id)
                                    }
                                  >
                                    <DeleteOutlineOutlinedIcon fontSize='small' />
                                  </IconButton>
                                </>
                              )}
                              {item.quantity > 1 && (
                                <>
                                  <IconButton
                                    size='small'
                                    sx={{
                                      borderRadius: 0,
                                      color: '#7B2D26',
                                      '&:hover': { backgroundColor: '#FFF5F4' }
                                    }}
                                    onClick={() =>
                                      handleChangeDecreaseQuantityProduct(product_id._id)
                                    }
                                  >
                                    <RemoveIcon fontSize='small' />
                                  </IconButton>
                                </>
                              )}

                              <Typography
                                sx={{
                                  px: 2,
                                  fontSize: 16,
                                  fontWeight: 500,
                                  minWidth: '40px',
                                  textAlign: 'center'
                                }}
                              >
                                {item.quantity}
                              </Typography>

                              <IconButton
                                size='small'
                                sx={{
                                  borderRadius: 0,
                                  color: '#7B2D26',
                                  '&:hover': { backgroundColor: '#FFF5F4' }
                                }}
                                onClick={() => handleChangeIncreaseQuantityProduct(product_id._id)}
                              >
                                <AddOutlinedIcon fontSize='small' />
                              </IconButton>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>
                  )
                })}
            </Grid>

            <Grid size={{ lg: 5, md: 12, sm: 12, xs: 12 }}>
              <Card>
                <Typography fontSize={24} fontWeight={400} sx={{ color: '3E2F2F' }}>
                  Resumen
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {cartSummary?.items?.map(item => {
                    return (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} key={item.id}>
                        <Typography fontSize={18} fontWeight={500} sx={{ color: '#3E2F2F' }}>
                          {item.name}
                        </Typography>
                        <Typography fontSize={18} fontWeight={500} sx={{ color: '#3E2F2F' }}>
                          {item.subtotal} €
                        </Typography>
                      </Box>
                    )
                  })}
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
                    {cartSummary.total} €
                  </Typography>
                </Box>

                <Button variant='contained' onClick={buyCart}>
                  Realizar pedido
                </Button>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </>
  )
}

export default CartPage
