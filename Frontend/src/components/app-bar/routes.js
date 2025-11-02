import { Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from '../../pages/login/index.js'
import ListEventsPage from '../../pages/list-events/index.js'
import DetailsEventPage from '../../pages/details-event/index.js'

const RoutesInvitaPRO = () => {
  return (
    <Routes>
      <Route path='/*' element={<Navigate to='/login' />} />
      <Route path='/login' Component={LoginPage} />
      <Route path='/list-events' Component={ListEventsPage} />
      <Route path='/list-events/details-event/:id_event' Component={DetailsEventPage} />
    </Routes>
  )
}

export default RoutesInvitaPRO
