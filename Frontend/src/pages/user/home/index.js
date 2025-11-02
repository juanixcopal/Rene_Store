import { Box, Button, Card, Grid, Typography } from "@mui/material"
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';


const HomePage = () => {
    return(
        <>
        <Box sx={{display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', gap: '30px'}}>
            <Typography fontSize={60} fontWeight={400}>Para Mujer</Typography>

            <Grid container spacing={'100px'} sx={{width: '100%', justifyContent: 'center'}} >
                <Grid size={{ lg: 2, md: 12, sm: 12, xs: 12 }}>
                    <Card sx={{minHeight: '400px', minWidth: '300px'}}>
                        Holaaa
                    </Card>
                    <Typography fontSize={18} fontWeight={500} sx={{color: '#3E2F2F'}}>Nombre producto</Typography>
                    <Typography fontSize={15} fontWeight={400} sx={{color: '#3E2F2F'}}>Descripcion</Typography>
                    <Typography fontSize={17} fontWeight={800}>Precio</Typography>
                </Grid>

                <Grid size={{ lg: 2, md: 12, sm: 12, xs: 12 }}>
                    <Card sx={{minHeight: '400px', minWidth: '300px'}}>
                        Holaaa
                    </Card>
                    <Typography fontSize={18} fontWeight={500} sx={{color: '#3E2F2F'}}>Nombre producto</Typography>
                    <Typography fontSize={15} fontWeight={400} sx={{color: '#3E2F2F'}}>Descripcion</Typography>
                    <Typography fontSize={17} fontWeight={800}>Precio</Typography>
                </Grid>

                <Grid size={{ lg: 2, md: 12, sm: 12, xs: 12 }}>
                    <Card sx={{minHeight: '400px', minWidth: '300px'}}>
                        Holaaa
                    </Card>
                    <Typography fontSize={18} fontWeight={500} sx={{color: '#3E2F2F'}}>Nombre producto</Typography>
                    <Typography fontSize={15} fontWeight={400} sx={{color: '#3E2F2F'}}>Descripcion</Typography>
                    <Typography fontSize={17} fontWeight={800}>Precio</Typography>
                </Grid>

                <Grid size={{ lg: 2, md: 12, sm: 12, xs: 12 }}>
                    <Card sx={{minHeight: '400px', minWidth: '300px'}}>
                        Holaaa
                    </Card>
                    <Typography fontSize={18} fontWeight={500} sx={{color: '#3E2F2F'}}>Nombre producto</Typography>
                    <Typography fontSize={15} fontWeight={400} sx={{color: '#3E2F2F'}}>Descripcion</Typography>
                    <Typography fontSize={17} fontWeight={800}>Precio</Typography>
                </Grid>

                <Grid size={{ lg: 2, md: 12, sm: 12, xs: 12 }}>
                    <Card sx={{minHeight: '400px', minWidth: '300px'}}>
                        Holaaa
                    </Card>
                    <Typography fontSize={18} fontWeight={500} sx={{color: '#3E2F2F'}}>Nombre producto</Typography>
                    <Typography fontSize={15} fontWeight={400} sx={{color: '#3E2F2F'}}>Descripcion</Typography>
                    <Typography fontSize={17} fontWeight={800}>Precio</Typography>
                </Grid>
            </Grid>

            <Button variant="contained" endIcon={<ArrowRightAltOutlinedIcon/>}>
                Ver mas
            </Button>
        </Box>

        <Box sx={{display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', gap: '30px', marginTop: '40px', marginBottom: '40px'}}>
            <Typography fontSize={60} fontWeight={400}>Para Hombre</Typography>

            <Grid container spacing={'100px'} sx={{width: '100%', justifyContent: 'center'}} >
                <Grid size={{ lg: 2, md: 12, sm: 12, xs: 12 }}>
                    <Card sx={{minHeight: '400px', minWidth: '300px'}}>
                        Holaaa
                    </Card>
                    <Typography fontSize={18} fontWeight={500} sx={{color: '#3E2F2F'}}>Nombre producto</Typography>
                    <Typography fontSize={15} fontWeight={400} sx={{color: '#3E2F2F'}}>Descripcion</Typography>
                    <Typography fontSize={17} fontWeight={800}>Precio</Typography>
                </Grid>

                <Grid size={{ lg: 2, md: 12, sm: 12, xs: 12 }}>
                    <Card sx={{minHeight: '400px', minWidth: '300px'}}>
                        Holaaa
                    </Card>
                    <Typography fontSize={18} fontWeight={500} sx={{color: '#3E2F2F'}}>Nombre producto</Typography>
                    <Typography fontSize={15} fontWeight={400} sx={{color: '#3E2F2F'}}>Descripcion</Typography>
                    <Typography fontSize={17} fontWeight={800}>Precio</Typography>
                </Grid>

                <Grid size={{ lg: 2, md: 12, sm: 12, xs: 12 }}>
                    <Card sx={{minHeight: '400px', minWidth: '300px'}}>
                        Holaaa
                    </Card>
                    <Typography fontSize={18} fontWeight={500} sx={{color: '#3E2F2F'}}>Nombre producto</Typography>
                    <Typography fontSize={15} fontWeight={400} sx={{color: '#3E2F2F'}}>Descripcion</Typography>
                    <Typography fontSize={17} fontWeight={800}>Precio</Typography>
                </Grid>

                <Grid size={{ lg: 2, md: 12, sm: 12, xs: 12 }}>
                    <Card sx={{minHeight: '400px', minWidth: '300px'}}>
                        Holaaa
                    </Card>
                    <Typography fontSize={18} fontWeight={500} sx={{color: '#3E2F2F'}}>Nombre producto</Typography>
                    <Typography fontSize={15} fontWeight={400} sx={{color: '#3E2F2F'}}>Descripcion</Typography>
                    <Typography fontSize={17} fontWeight={800}>Precio</Typography>
                </Grid>

                <Grid size={{ lg: 2, md: 12, sm: 12, xs: 12 }}>
                    <Card sx={{minHeight: '400px', minWidth: '300px'}}>
                        Holaaa
                    </Card>
                    <Typography fontSize={18} fontWeight={500} sx={{color: '#3E2F2F'}}>Nombre producto</Typography>
                    <Typography fontSize={15} fontWeight={400} sx={{color: '#3E2F2F'}}>Descripcion</Typography>
                    <Typography fontSize={17} fontWeight={800}>Precio</Typography>
                </Grid>
            </Grid>

            <Button variant="contained" endIcon={<ArrowRightAltOutlinedIcon/>}>
                Ver mas
            </Button>
        </Box>
        </>
    )
}

export default HomePage