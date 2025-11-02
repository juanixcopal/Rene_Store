import { Grid, TextField, Button, MenuItem } from '@mui/material'
import 'dayjs/locale/es'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
const StepOne = ({ useFetchInit }) => {
  const { onClose, handleNextStep, fetchTypeEvent, fetchHall, handleInputNewEvent, dataNewEvent } =
    useFetchInit
  const { typeEvent } = fetchTypeEvent
  const { hall } = fetchHall

  return (
    <>
      <form onSubmit={handleNextStep}>
        <Grid container spacing={'16px'} sx={{ paddingTop: '10px' }}>
          <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
            <TextField
              label='Nombre del evento'
              name='event_name'
              onChange={handleInputNewEvent}
              value={dataNewEvent.event_name || ''}
              required
            />
          </Grid>

          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <TextField
              label='Tipo'
              name='id_type_event'
              onChange={handleInputNewEvent}
              select
              value={dataNewEvent.id_type_event || ''}
              required
            >
              {typeEvent.map(item => {
                return (
                  <MenuItem key={item.id_type_event} id={item.id_type_event} value={item.id_type_event}>
                    {item.type_event}
                  </MenuItem>
                )
              })}
            </TextField>
          </Grid>

          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <TextField
              label='Ubicación'
              name='id_hall'
              onChange={handleInputNewEvent}
              select
              value={dataNewEvent.id_hall || ''}
              required
            >
              {hall.map(item => {
                return (
                  <MenuItem key={item.id_hall} id={item.id_hall} value={item.id_hall}>
                    {item.hall_name}
                  </MenuItem>
                )
              })}
            </TextField>
          </Grid>

          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
              <DatePicker
                label='Fecha inicio'
                value={dataNewEvent.start_date ? dayjs(dataNewEvent.start_date) : null}
                onChange={date =>
                  handleInputNewEvent({
                    target: { name: 'start_date', value: dayjs(date).format('YYYY-MM-DD') }
                  })
                }
                sx={{
                  width: '100%'
                }}
                slotProps={{
                  textField: {
                    required: true,
                    InputLabelProps: {
                      sx: {
                        '& .MuiInputLabel-asterisk': { display: 'none' }
                      }
                    }
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label='Hora inicio'
                value={dataNewEvent.start_time ? dayjs(dataNewEvent.start_time, 'HH:mm') : null}
                onChange={value =>
                  handleInputNewEvent({
                    target: {
                      name: 'start_time',
                      value: value ? dayjs(value).format('HH:mm') : ''
                    }
                  })
                }
                ampm={false}
                sx={{
                  width: '100%'
                }}
                slotProps={{
                  textField: {
                    required: true,
                    InputLabelProps: {
                      sx: {
                        '& .MuiInputLabel-asterisk': { display: 'none' }
                      }
                    }
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
              <DatePicker
                label='Fecha fin'
                value={dataNewEvent.end_date ? dayjs(dataNewEvent.end_date) : null}
                onChange={date =>
                  handleInputNewEvent({
                    target: { name: 'end_date', value: dayjs(date).format('YYYY-MM-DD') }
                  })
                }
                sx={{
                  width: '100%'
                }}
                slotProps={{
                  textField: {
                    required: true,
                    InputLabelProps: {
                      sx: {
                        '& .MuiInputLabel-asterisk': { display: 'none' }
                      }
                    }
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label='Hora fin'
                value={dataNewEvent.end_time ? dayjs(dataNewEvent.end_time, 'HH:mm') : null}
                onChange={value =>
                  handleInputNewEvent({
                    target: {
                      name: 'end_time',
                      value: value ? dayjs(value).format('HH:mm') : ''
                    }
                  })
                }
                ampm={false}
                sx={{
                  width: '100%'
                }}
                slotProps={{
                  textField: {
                    required: true,
                    InputLabelProps: {
                      sx: {
                        '& .MuiInputLabel-asterisk': { display: 'none' }
                      }
                    }
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
            <TextField
              label='Descripción'
              name='description'
              onChange={handleInputNewEvent}
              multiline
              rows={5}
              value={dataNewEvent.description || ''}
              required
            />
          </Grid>

          <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
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
              <Button variant='text' type='submit'>
                Siguiente
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default StepOne
