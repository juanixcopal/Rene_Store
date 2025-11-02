import { Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from '../../pages/login/index.js'
import HomePage from '../../pages/user/home/index.js'
import ManPage from '../../pages/user/man/index.js'
import WomenPage from '../../pages/user/women/index.js'
import OrdersPage from '../../pages/user/orders/index.js'

const RoutesRenielStore = () => {
    return(
        <Routes>
            <Route path='/*' element={<Navigate to='/login' />} />
            <Route path='/login' Component={LoginPage} />
            <Route path='/home' Component={HomePage} />
            <Route path='/man' Component={ManPage} />
            <Route path='/women' Component={WomenPage} />
            <Route path='/orders' Component={OrdersPage} />
        </Routes>
    )
}

export default RoutesRenielStore