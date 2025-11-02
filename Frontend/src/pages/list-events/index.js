import HeaderInvitaPRO from '../../components/header'
import {
  Button,
  Card,
  Chip,
  Grid,
  Typography,
  Pagination,
  TextField,
  InputAdornment,
  Popover,
  MenuItem
} from '@mui/material'
import { useFetchInitListEvents } from '../../hooks/list-events'
import { alpha } from '@mui/material/styles'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import CheckIcon from '@mui/icons-material/Check'
import MainModal from './modal'
import './index.css'

const ListEventsPage = () => {
  const listEventsHook = useFetchInitListEvents()
  const {
    idFilterHall,
    idFilterTypeEvent,
    page,
    openFilterTypeEvent,
    openFilterHall,
    anchorFilterHall,
    anchorFilterTypeEvent,
    chipData,
    searchTerm,
    fetchEvents,
    fetchTypeEvent,
    fetchHall,
    handleChangePage,
    handleClickFilterTypeEvent,
    handleClickFilterHall,
    handleClearFilters,
    handleSelectFilters,
    handleDeleteFilterChip,
    handleChangeSearchTerm,
    toggle
  } = listEventsHook

  const { events, loadingEvents } = fetchEvents
  const { typeEvent, loadingTypeEvent } = fetchTypeEvent
  const { hall, loadingHall } = fetchHall

  return (
    <>
      <MainModal useFetchInit={listEventsHook} />
      <div className='container-header-button'>
        <HeaderInvitaPRO titlePage={'Listado de eventos'} />
        <Button variant='contained' onClick={() => toggle(null, 'Nuevo evento', 'new-event')}>
          Nuevo
        </Button>
      </div>

      <Card>
        <Grid container spacing={'8px'} alignItems={'center'}>
          <Grid size={{ lg: 2, md: 3, sm: 12, xs: 12 }}>
            <TextField
              label='Buscar eventos'
              value={searchTerm}
              onChange={e => handleChangeSearchTerm(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchOutlinedIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Chip
            label={'Tipo de evento'}
            icon={openFilterTypeEvent ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            onClick={handleClickFilterTypeEvent}
            variant='filled'
            size='medium'
            sx={{
              flexDirection: 'row-reverse',
              fontSize: '14px'
            }}
          />

          <Popover
            id={idFilterTypeEvent}
            open={openFilterTypeEvent}
            anchorEl={anchorFilterTypeEvent}
            onClose={handleClickFilterTypeEvent}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
          >
            <Card
              sx={{
                padding: '0px',
                minWidth: '168px',
                gap: '0px'
              }}
            >
              {loadingTypeEvent && (
                <>
                  {typeEvent.map(item => {
                    return (
                      <MenuItem
                        key={item.id_type_event}
                        value={item.id_type_event}
                        onClick={() => handleSelectFilters(item, 'type_event')}
                      >
                        {item.type_event}
                      </MenuItem>
                    )
                  })}
                </>
              )}
            </Card>
          </Popover>

          <Chip
            label={'Ubicación'}
            icon={openFilterHall ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            onClick={handleClickFilterHall}
            variant='filled'
            size='medium'
            sx={{
              flexDirection: 'row-reverse',
              fontSize: '14px'
            }}
          />
          <Popover
            id={idFilterHall}
            open={openFilterHall}
            anchorEl={anchorFilterHall}
            onClose={handleClickFilterHall}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
          >
            <Card
              sx={{
                padding: '0px',
                minWidth: '168px',
                gap: '0px'
              }}
            >
              {loadingHall && (
                <>
                  {hall.map(item => {
                    return (
                      <MenuItem
                        key={item.id_hall}
                        value={item.id_hall}
                        onClick={() => handleSelectFilters(item, 'hall')}
                      >
                        {item.hall_name}
                      </MenuItem>
                    )
                  })}
                </>
              )}
            </Card>
          </Popover>

          <Button
            variant='text'
            onClick={handleClearFilters}
            sx={{
              color: theme => theme.palette.neutral[800]
            }}
          >
            Limpiar
          </Button>

          {chipData.map(data => {
            return (
              <Chip
                key={data.key}
                label={data.label}
                icon={<CheckIcon />}
                variant='filled'
                size='medium'
                onDelete={handleDeleteFilterChip(data)}
                sx={{
                  background: theme => theme.palette.informative[50]
                }}
              />
            )
          })}
        </Grid>
        <Grid container spacing={'24px'}>
          {loadingEvents && (
            <>
              {events.data.map(item => {
                return (
                  <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }} key={item.id_event}>
                    <Card
                      sx={theme => ({
                        border: `1px solid ${theme.palette.neutral[300]}`
                      })}
                    >
                      <Grid container spacing={'16px'}>
                        <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
                          <Typography
                            className='one-line-truncate'
                            sx={{
                              fontSize: '22px',
                              fontWeight: 600
                            }}
                          >
                            {item.event_name}
                          </Typography>
                        </Grid>

                        <Grid size={{ lg: 4, md: 6, sm: 12, xs: 12 }}>
                          <div className='card-content-detail-event'>
                            <Typography
                              sx={{
                                fontSize: '14px',
                                fontWeight: 600
                              }}
                            >
                              Fecha:
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: '14px',
                                fontWeight: 400
                              }}
                            >
                              {item.start_date}
                            </Typography>
                          </div>
                        </Grid>

                        <Grid size={{ lg: 8, md: 6, sm: 12, xs: 12 }}>
                          <div className='card-content-detail-event'>
                            <Typography
                              sx={{
                                fontSize: '14px',
                                fontWeight: 600
                              }}
                            >
                              Hora:
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: '14px',
                                fontWeight: 400
                              }}
                            >
                              {item.start_time}
                            </Typography>
                          </div>
                        </Grid>

                        <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
                          <div className='card-content-detail-event'>
                            <Typography
                              sx={{
                                fontSize: '14px',
                                fontWeight: 600
                              }}
                            >
                              Ubicación:
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: '14px',
                                fontWeight: 400
                              }}
                            >
                              {item.hall.hall_name}
                            </Typography>
                          </div>
                        </Grid>

                        <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
                          <Typography
                            sx={{
                              fontSize: '14px',
                              fontWeight: 600
                            }}
                          >
                            Descripción:
                          </Typography>
                          <Typography
                            className='multi-line-truncate'
                            sx={{
                              fontSize: '14px',
                              fontWeight: 400
                            }}
                          >
                            {item.description}
                          </Typography>
                        </Grid>

                        <Grid size={{ lg: 6, md: 6, sm: 6, xs: 6 }}>
                          <Chip
                            label={item.type.type_event}
                            variant='filled'
                            sx={{
                              color: item.type.color,
                              background: alpha(item.type.color, 0.1),
                              fontSize: '11px'
                            }}
                          />
                        </Grid>

                        <Grid
                          size={{ lg: 6, md: 6, sm: 6, xs: 6 }}
                          sx={{ display: 'flex', justifyContent: 'right' }}
                        >
                          <Button 
                            href={`/list-events/details-event/${item.id_event}`}
                            variant='text'>
                            Ver más</Button>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                )
              })}
            </>
          )}
          {events?.last_page >= 2 && (
            <Grid
              size={{ lg: 12, md: 12, sm: 12, xs: 12 }}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Pagination
                count={events?.last_page}
                variant='outlined'
                shape='rounded'
                page={page}
                onChange={(event, page) => handleChangePage(page)}
              />
            </Grid>
          )}
        </Grid>
      </Card>
    </>
  )
}

export default ListEventsPage
