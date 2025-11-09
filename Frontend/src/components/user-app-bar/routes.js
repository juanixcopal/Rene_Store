import { Routes, Route, Navigate } from 'react-router-dom'
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
      {/* Redirección de raíz a /login */}
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/man' element={<ManPage />} />
      <Route path='/woman' element={<WomanPage />} />
      <Route path='/orders' element={<OrdersPage />} />
      <Route path='/product-details/:id' element={<ProductDetailsPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/chat' element={<UserChatPage />} />
      {/* Ruta comodín para cualquier otra URL */}
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  )
}

export default UserRoutes
