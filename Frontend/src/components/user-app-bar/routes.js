import { Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from '../../pages/login/index.js'
import HomePage from '../../pages/user/home/index.js'
import ManPage from '../../pages/user/man/index.js'
import WomanPage from '../../pages/user/woman/index.js'
import OrdersPage from '../../pages/user/orders/index.js'
import ProductDetailsPage from '../../pages/user/product-details/index.js'
import CartPage from '../../pages/user/cart/index.js'
import UserChatPage from '../../pages/user/chat/index.js'

const UserRoutes = () => {
  return (
    <Routes>
      <Route path='/*' element={<Navigate to='/login' />} />
      <Route path='/login' Component={LoginPage} />
      <Route path='/home' Component={HomePage} />
      <Route path='/man' Component={ManPage} />
      <Route path='/woman' Component={WomanPage} />
      <Route path='/orders' Component={OrdersPage} />
      <Route path='/product-details/:id' Component={ProductDetailsPage} />
      <Route path='/cart' Component={CartPage} />
      <Route path='/chat' Component={UserChatPage} />
    </Routes>
  )
}

export default UserRoutes
