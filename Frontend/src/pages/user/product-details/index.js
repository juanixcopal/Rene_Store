import { useEffect } from 'react'
import { useFetchInitProductDetails } from '../../../hooks/product-details'
import { useParams } from 'react-router-dom'
import { Typography, Card, Button, Grid, Box } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

const ProductDetailsPage = () => {
  const { id } = useParams()
  const productDetailsHook = useFetchInitProductDetails()
  const { handleChangeIdProduct, fetchProductDetails } = productDetailsHook

  useEffect(() => {
    handleChangeIdProduct(id)
    // eslint-disable-next-line
  }, [id])

  const { productDetails, loadingProductDetails } = fetchProductDetails

  return (
    <>
      <Box>
        {loadingProductDetails && (
          <Grid container spacing={'50px'} justifyContent='center' alignItems='flex-start'>
            <Grid>
              <Card sx={{ maxHeight: '580px', maxWidth: '480px' }}>
                <img src={productDetails.image} height='500px' width='430px' alt='PRODUCT' />
              </Card>
            </Grid>

            {/* Detalles del producto */}
            <Grid>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography fontSize={35} fontWeight={500} sx={{ color: '#3E2F2F' }}>
                  {productDetails.name}
                </Typography>

                <Typography fontSize={20} fontWeight={500} sx={{ color: '#3E2F2F' }}>
                  {productDetails.description}
                </Typography>

                <Typography fontSize={16} fontWeight={500} sx={{ color: '#3E2F2F' }}>
                  {productDetails.category_id.product}
                </Typography>

                <Typography fontSize={28} fontWeight={700}>
                  {productDetails.price} €
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 20 }}>
                  <Button variant='contained'>Añadir a la cesta</Button>
                  <Button variant='outlined' endIcon={<FavoriteIcon />}>
                    Favorito
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  )
}

export default ProductDetailsPage
