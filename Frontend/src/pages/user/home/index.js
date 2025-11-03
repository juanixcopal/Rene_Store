import { Box, Button, Card, Grid, Typography } from "@mui/material"
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import { useFetchInitHome } from '../../../hooks/home/index'

const HomePage = () => {

    const homeHook = useFetchInitHome()

    const { fetch5ManProducts, fetch5WomenProducts } = homeHook
    const {fiveManProducts} = fetch5ManProducts
    const {fiveWomenProducts} = fetch5WomenProducts 

    return(
        <>
        <Box sx={{display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', gap: '30px'}}>
            <Typography fontSize={60} fontWeight={400}>Para Mujer</Typography>

            <Grid container spacing={'100px'} sx={{width: '100%', justifyContent: 'center'}} >
                {fiveWomenProducts.map(item => {
                    return(
                        <Grid size={{ lg: 2, md: 12, sm: 12, xs: 12 }} key={item._id}>
                            <Card sx={{minHeight: '400px', minWidth: '300px'}}>
                                <img src={item.image} width='250px' height='350px' alt="PRODUCT"/>
                            </Card>
                            <Typography fontSize={18} fontWeight={500} sx={{color: '#3E2F2F'}}>{item.name}</Typography>
                            <Typography fontSize={15} fontWeight={400} sx={{color: '#3E2F2F'}}>{item.description}</Typography>
                            <Typography fontSize={20} fontWeight={700}>{item.price} €</Typography>
                        </Grid>
                    )
                })}
            </Grid>

            <Button variant="contained" endIcon={<ArrowRightAltOutlinedIcon/>}>
                Ver mas
            </Button>
        </Box>

        <Box sx={{display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', gap: '30px', marginTop: '40px', marginBottom: '40px'}}>
            <Typography fontSize={60} fontWeight={400}>Para Hombre</Typography>

            <Grid container spacing={'100px'} sx={{width: '100%', justifyContent: 'center'}} >
                {fiveManProducts.map(item => {
                    return(
                        <Grid size={{ lg: 2, md: 12, sm: 12, xs: 12 }} key={item._id}>
                            <Card sx={{minHeight: '400px', minWidth: '300px'}}>
                                <img src={item.image} width='250px' height='350px' alt="PRODUCT"/>
                            </Card>
                            <Typography fontSize={18} fontWeight={500} sx={{color: '#3E2F2F'}}>{item.name}</Typography>
                            <Typography fontSize={15} fontWeight={400} sx={{color: '#3E2F2F'}}>{item.description}</Typography>
                            <Typography fontSize={20} fontWeight={700}>{item.price} €</Typography>
                        </Grid>
                    )
                })}
            </Grid>

            <Button variant="contained" endIcon={<ArrowRightAltOutlinedIcon/>}>
                Ver mas
            </Button>
        </Box>
        </>
    )
}

export default HomePage