import { Routes, Route, Navigate } from 'react-router-dom'
import DashboarPage from '../../pages/admin/dashboard'
import ProductsPage from '../../pages/admin/products'
import AdminOrdersPage from '../../pages/admin/orders'
// import AdminOrders from "../../pages/admin/orders"
// import AdminUsers from "../../pages/admin/users"

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='/admin/*' element={<Navigate to='/admin/dashboard' />} />
      <Route path='/admin/dashboard' element={<DashboarPage />} />
      <Route path='/admin/products' element={<ProductsPage />} />
      <Route path='/admin/orders' element={<AdminOrdersPage />} />
      {/* <Route path="/admin/users" element={<AdminUsers />} /> */}
    </Routes>
  )
}

export default AdminRoutes
