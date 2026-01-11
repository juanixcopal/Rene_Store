import { Box, Button, Card, Typography, Grid } from '@mui/material'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'
import { useFetchInitHome } from '../../../hooks/home/index'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const homeHook = useFetchInitHome()

  const { fetch5ManProducts, fetch5WomanProducts } = homeHook
  const { fiveManProducts } = fetch5ManProducts
  const { fiveWomanProducts } = fetch5WomanProducts

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
          alignItems: 'center',
          gap: '30px'
        }}
      >
        <Typography fontSize={60} fontWeight={400}>
          Para Mujer
        </Typography>

        <Grid container spacing={2}>
          {fiveWomanProducts.map(item => {
            return (
              <Grid
                size={{ lg: 2.4, md: 12, sm: 12, xs: 12 }}
                key={item._id}
                onClick={() => navigate(`/product-details/${item._id}`)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { transform: 'scale(1.03)', transition: '0.3s' }
                }}
              >
                <Card>
                  <Box
                    sx={{
                      width: '100%',
                      height: '350px',
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

        <Button variant='contained' endIcon={<ArrowRightAltOutlinedIcon />} href='/woman'>
          Ver mas
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px',
          marginTop: '40px',
          marginBottom: '40px'
        }}
      >
        <Typography fontSize={60} fontWeight={400}>
          Para Hombre
        </Typography>

        <Grid container spacing={2}>
          {fiveManProducts.map(item => {
            return (
              <Grid
                size={{ lg: 2.4, md: 12, sm: 12, xs: 12 }}
                key={item._id}
                onClick={() => navigate(`/product-details/${item._id}`)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { transform: 'scale(1.03)', transition: '0.3s' }
                }}
              >
                <Card>
                  <Box
                    sx={{
                      width: '100%',
                      height: '350px',
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

        <Button variant='contained' endIcon={<ArrowRightAltOutlinedIcon />} href='/man'>
          Ver mas
        </Button>
      </Box>
    </>
  )
}

export default HomePage
