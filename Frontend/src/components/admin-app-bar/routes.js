import { Routes, Route, Navigate } from 'react-router-dom'
import DashboarPage from '../../pages/admin/dashboard/index.js'
import ProductsPage from '../../pages/admin/products/index.js'
import AdminOrdersPage from '../../pages/admin/orders/index.js'
import UsersPage from '../../pages/admin/users/index.js'
import AdminChatsPage from '../../pages/admin/chat/index.js'

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Redirección solo de /admin a /admin/dashboard */}
      <Route path='/admin' element={<Navigate to='/admin/dashboard' />} />
      <Route path='/admin/dashboard' element={<DashboarPage />} />
      <Route path='/admin/products' element={<ProductsPage />} />
      <Route path='/admin/orders' element={<AdminOrdersPage />} />
      <Route path='/admin/users' element={<UsersPage />} />
      <Route path='/admin/chats' element={<AdminChatsPage />} />
    </Routes>
  )
}

export default AdminRoutes
