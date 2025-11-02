import { Card, CardHeader, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import {Gauge, gaugeClasses } from '@mui/x-charts/Gauge'

const AttendanceTab = () => {
    return(
        <>
        <Grid container spacing={'80px'}>
            <Grid size={{ lg: 8, md: 12, sm: 12, xs: 12 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Nombre
                                </TableCell>
                                <TableCell>
                                    Evento
                                </TableCell>
                                <TableCell>
                                    Fecha y hora checkin
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    René Ixcopal
                                </TableCell>
                                <TableCell>
                                    Graduación GII
                                </TableCell>
                                <TableCell>
                                    11/05/2025 - 14:15 h.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    René Ixcopal
                                </TableCell>
                                <TableCell>
                                    Graduación GII
                                </TableCell>
                                <TableCell>
                                    11/05/2025 - 14:15 h.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            <Grid size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
                <Card sx={{border: '1px solid rgba(0, 0, 0, 0.25)'}}>
                    <CardHeader title='Estado del aforo' />

                    <Gauge value={75} valueMax={400} cornerRadius={'100%'} innerRadius={'85%'} startAngle={-130} endAngle={130} text={({ value, valueMax }) => `${value} / ${valueMax}`} sx={{
                        [`& .${gaugeClasses.valueText}`]: {
                        fontFamily: 'Open Sans',
                        fontWeight: 500,
                        fontSize: '20px',
                        fill: '#404040',
                        },
                        [`& .${gaugeClasses.referenceArc}`]: {
                            fill: '#E8F0FE',
                        },
                    }}/>

                    <Grid container spacing={'8px'}>
                        <Grid size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
                        <div className='chard-footer-state'>
                            <div style={{width: '10px', height: '10px', background: '#01579B', borderRadius: '100%'}} />
                            <Typography fontSize={'14px'} fontWeight={700} color="#767676">
                                Entradas registradas
                            </Typography>
                        </div>
                        </Grid>  
                        <Grid size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
                            <div className='chard-footer-state'>
                                <div style={{width: '10px', height: '10px', background: '#E8F0FE', borderRadius: '100%'}} />
                                <Typography fontSize={'14px'} fontWeight={700} color="#767676">
                                    Disponibilidad
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
        </>
    )
}

export default AttendanceTab