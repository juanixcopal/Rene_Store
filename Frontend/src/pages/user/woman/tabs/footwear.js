import { Box, Card, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const FootwarTab = ({ useFetchInit }) => {
  const { fetchWomanFootwear } = useFetchInit

  const { womanFootwear } = fetchWomanFootwear

  const navigate = useNavigate()

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Grid
          container
          columnGap={'100px'}
          rowGap={'30px'}
          sx={{ width: '100%', justifyContent: 'center' }}
        >
          {womanFootwear.map(item => {
            return (
              <Grid
                size={{ lg: 2.5, md: 12, sm: 12, xs: 12 }}
                key={item._id}
                onClick={() => navigate(`/product-details/${item._id}`)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { transform: 'scale(1.03)', transition: '0.3s' }
                }}
              >
                <Card sx={{ minHeight: '400px', minWidth: '300px', alignItems: 'center' }}>
                  <img src={item.image} width='250px' height='350px' alt='PRODUCT' />
                </Card>
                <Typography fontSize={18} fontWeight={500} sx={{ color: '#3E2F2F' }}>
                  {item.name}
                </Typography>
                <Typography fontSize={15} fontWeight={400} sx={{ color: '#3E2F2F' }}>
                  {item.description}
                </Typography>
                <Typography fontSize={20} fontWeight={700}>
                  {item.price} €
                </Typography>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </>
  )
}

export default FootwarTab
