import mongoose from 'mongoose'
import env from '../../config/env.js'

import makeUserData from './user.data.js'
import makeRoleData from './role.data.js'
import makeCategoryData from './category.data.js'
import makeProductData from './product.data.js'
import makeCartData from './cart.data.js'
import makeDashboardData from './dashboard.data.js'
import makeOrderData from './order.data.js'

const { MONGO_URI } = env // ejemplo: mongodb://localhost:27017/renielstore

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err.message))

// 🔹 Cargar modelos
import User from '../../../models/user.model.js'
import Rol from '../../../models/rol.model.js'
import Category from '../../../models/category.model.js'
import Product from '../../../models/product.model.js'
import Cart from '../../../models/cart.model.js'
import Order from '../../../models/order.model.js'

// 🔹 Crear instancias de los "data access" (como hacías con Sequelize)
const userData = makeUserData({ User, Rol })
const roleData = makeRoleData({ Rol })
const categoryData = makeCategoryData({ Category })
const productData = makeProductData({ Product, Category, Cart })
const cartData = makeCartData({ Cart, Order })
const dashboardData = makeDashboardData({ Order })
const orderData = makeOrderData({ Order })

export { userData, roleData, categoryData, productData, cartData, dashboardData, orderData }
