import { Grid, TextField, MenuItem, Button } from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { useEventForm } from "../../../hooks/details-event/use-event-form"

const ConfigurationTab = ({ useFetchInit }) => {
    const { fetchTypeEvent, fetchHall, fetchDeatilsEvent, idEvent } = useFetchInit
    const { typeEvent } = fetchTypeEvent
    const { hall } = fetchHall
    const { detailsEvent, loadingDetailsEvent } = fetchDeatilsEvent
    const { formData, handleChange, handleDateChange, handleChangeTime, isModified, actions } = useEventForm(detailsEvent, idEvent, fetchDeatilsEvent)
    const {updateDataEvent} = actions    
  
    return (
      <>
        {loadingDetailsEvent && (
          <div className="container-summary-new-event">
            <Grid container spacing={'16px'}>
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
                <TextField
                  label="Nombre del evento"
                  name="event_name"
                  value={formData.event_name}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
  
              <Grid size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
                <TextField
                  select
                  label="Tipo"
                  name="id_type_event"
                  value={formData.id_type_event}
                  onChange={handleChange}
                  fullWidth
                >
                  {typeEvent.map(item => (
                    <MenuItem key={item.id_type_event} value={item.id_type_event}>
                      {item.type_event}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
  
              <Grid size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
                <TextField
                  select
                  label="Ubicación"
                  name="id_hall"
                  value={formData.id_hall}
                  onChange={handleChange}
                  fullWidth
                >
                  {hall.map(item => (
                    <MenuItem key={item.id_hall} value={item.id_hall}>
                      {item.hall_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
  
              <Grid size={{ lg: 3, md: 12, sm: 12, xs: 12 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                  <DatePicker
                    label="Fecha inicio"
                    value={formData.start_date}
                    onChange={(value) => handleDateChange('start_date', value)}
                    sx={{ width: '100%' }}
                  />
                </LocalizationProvider>
              </Grid>
  
              <Grid size={{ lg: 3, md: 12, sm: 12, xs: 12 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Hora inicio"
                    value={formData.start_time}
                    onChange={(value) => handleChangeTime('start_time', value)}
                    ampm={false}
                    sx={{ width: '100%' }}
                  />
                </LocalizationProvider>
              </Grid>
  
              <Grid size={{ lg: 3, md: 12, sm: 12, xs: 12 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                  <DatePicker
                    label="Fecha fin"
                    value={formData.end_date}
                    onChange={(value) => handleDateChange('end_date', value)}
                    sx={{ width: '100%' }}
                  />
                </LocalizationProvider>
              </Grid>
  
              <Grid size={{ lg: 3, md: 12, sm: 12, xs: 12 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Hora fin"
                    value={formData.end_time}
                    onChange={(value) => handleChangeTime('end_time', value)}
                    ampm={false}
                    sx={{ width: '100%' }}
                  />
                </LocalizationProvider>
              </Grid>
  
              <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
                <TextField
                  label="Descripción"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={5}
                  fullWidth
                />
              </Grid>
  
              <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
                <div className="buttons-footer-modal">
                  <Button variant="text" disabled={isModified} onClick={updateDataEvent}>
                    Guardar
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        )}
      </>
    )
  }
  

export default ConfigurationTab