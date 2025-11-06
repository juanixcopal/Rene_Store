import { Routes, Route, Navigate } from 'react-router-dom'
import DashboarPage from '../../pages/admin/dashboard'
// import AdminProducts from "../../pages/admin/products"
// import AdminOrders from "../../pages/admin/orders"
// import AdminUsers from "../../pages/admin/users"

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='/admin/*' element={<Navigate to='/admin/dashboard' />} />
      <Route path='/admin/dashboard' element={<DashboarPage />} />
      {/* <Route path="/admin/products" element={<AdminProducts />} /> */}
      {/* <Route path="/admin/orders" element={<AdminOrders />} /> */}
      {/* <Route path="/admin/users" element={<AdminUsers />} /> */}
    </Routes>
  )
}

export default AdminRoutes
