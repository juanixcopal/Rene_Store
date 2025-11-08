import { Box, Grid, Card, Typography, styled, InputBase, Button, IconButton } from '@mui/material'
import { useFechtInitProducts } from '../../../hooks/products'
import SearchIcon from '@mui/icons-material/Search'
import EditSquareIcon from '@mui/icons-material/EditSquare'
import MainModal from './modal/index.js'

const ProductsPage = () => {
  const mainHook = useFechtInitProducts()
  const { fechtAllProducts, toggle } = mainHook
  const { allProducts } = fechtAllProducts

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '15px',
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: '400px'
  }))

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#7B2D26'
  }))

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#3E2F2F',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1.5, 1.5, 1.5, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      fontSize: '15px'
    }
  }))

  return (
    <>
      <MainModal useFetchInit={mainHook} />
      <Grid container spacing={2} sx={{ marginBottom: '30px', alignItems: 'center' }}>
        <Grid size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
          <Typography fontSize={22} fontWeight={500} color='#3E2F2F'>
            Productos
          </Typography>
        </Grid>

        <Grid size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder='Buscar' inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Grid>

        <Grid
          size={{ lg: 4, md: 6, sm: 12, xs: 12 }}
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <Button variant='contained' onClick={() => toggle(null, 'Crear producto', 'new-product')}>
            Añadir producto
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {allProducts.map(item => {
          return (
            <Grid size={{ lg: 3, md: 6, sm: 6, xs: 12 }} key={item._id}>
              <Card
                sx={{ position: 'relative', overflow: 'visible', width: '300px', height: '400px' }}
              >
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
                    zIndex: 1,
                    '&:hover': {
                      backgroundColor: '#FFF5F4'
                    }
                  }}
                  size='small'
                >
                  <EditSquareIcon sx={{ fontSize: 20, color: '#7B2D26' }} />
                </IconButton>

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
              <Typography fontSize={15} fontWeight={500} sx={{ color: '#3E2F2F' }}>
                {item.description}
              </Typography>
              <Typography fontSize={18} fontWeight={600}>
                {item.price} €
              </Typography>
              <Typography fontSize={18} fontWeight={600}>
                Unidades: {item.stock}
              </Typography>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default ProductsPage
