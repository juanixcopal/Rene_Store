import { Button, Grid, Typography } from '@mui/material'

const StepTwo = ({ useFetchInit }) => {
  const { dataNewEvent, onClose, handleBackStep, actions } = useFetchInit
  const {createNewEvent} = actions

  return (
    <>
      <div className='container-summary-new-event'>
        <Grid container spacing={'16px'}>
          <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
            <div className='card-content-detail-event'>
              <Typography fontSize={'14px'} fontWeight={600}>
                Nombre de evento:
              </Typography>
              <Typography fontSize={'14px'} fontWeight={400}>
                {dataNewEvent.event_name}
              </Typography>
            </div>
          </Grid>

          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <div className='card-content-detail-event'>
              <Typography fontSize={'14px'} fontWeight={600}>
                Tipo:
              </Typography>
              <Typography fontSize={'14px'} fontWeight={400}>
                {dataNewEvent.type_event}
              </Typography>
            </div>
          </Grid>

          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <div className='card-content-detail-event'>
              <Typography fontSize={'14px'} fontWeight={600}>
                Ubicación:
              </Typography>
              <Typography fontSize={'14px'} fontWeight={400}>
              {dataNewEvent.hall_name}
              </Typography>
            </div>
          </Grid>

          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <div className='card-content-detail-event'>
              <Typography fontSize={'14px'} fontWeight={600}>
                Fecha inicio:
              </Typography>
              <Typography fontSize={'14px'} fontWeight={400}>
              {dataNewEvent.start_date}
              </Typography>
            </div>
          </Grid>

          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <div className='card-content-detail-event'>
              <Typography fontSize={'14px'} fontWeight={600}>
                Hora inicio:
              </Typography>
              <Typography fontSize={'14px'} fontWeight={400}>
                {dataNewEvent.start_time}
              </Typography>
            </div>
          </Grid>

          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <div className='card-content-detail-event'>
              <Typography fontSize={'14px'} fontWeight={600}>
                Fecha fin:
              </Typography>
              <Typography fontSize={'14px'} fontWeight={400}>
                {dataNewEvent.end_date}
              </Typography>
            </div>
          </Grid>

          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <div className='card-content-detail-event'>
              <Typography fontSize={'14px'} fontWeight={600}>
                Hora fin:
              </Typography>
              <Typography fontSize={'14px'} fontWeight={400}>
                {dataNewEvent.end_time}
              </Typography>
            </div>
          </Grid>

          <Grid size={{ lg: 12, md: 6, sm: 12, xs: 12 }}>
            <Typography fontSize={'14px'} fontWeight={600}>
              Descripción:
            </Typography>
            <Typography fontSize={'14px'} fontWeight={400}>
              {dataNewEvent.description}
            </Typography>
          </Grid>
        </Grid>
      </div>

      <Grid container sx={{ marginTop: '16px' }}>
        <Grid size={{ lg: 6, md: 6, sm: 6, xs: 6 }}>
          <Button
            variant='text'
            sx={theme => ({
              color: theme.palette.neutral[800]
            })}
            onClick={handleBackStep}
          >
            Anterior
          </Button>
        </Grid>

        <Grid size={{ lg: 6, md: 6, sm: 6, xs: 6 }}>
          <div className='buttons-footer-modal'>
            <Button
              variant='text'
              sx={theme => ({
                color: theme.palette.neutral[800]
              })}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button variant='text' onClick={createNewEvent}>Crear</Button>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default StepTwo
