import { Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from '../../pages/login/index.js'

const RoutesRenielStore = () => {
    return(
        <Routes>
            <Route path='/*' element={<Navigate to='/login' />} />
            <Route path='/login' Component={LoginPage} />
        </Routes>
    )
}

export default RoutesRenielStore