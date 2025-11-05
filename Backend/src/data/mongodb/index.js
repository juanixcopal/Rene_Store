import mongoose from 'mongoose'
import env from '../../config/env.js'

import makeUserData from './user.data.js'
import makeRoleData from './role.data.js'
import makeCategoryData from './category.data.js'
import makeProductData from './product.data.js'

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

// 🔹 Crear instancias de los "data access" (como hacías con Sequelize)
const userData = makeUserData({ User, Rol })
const roleData = makeRoleData({ Rol })
const categoryData = makeCategoryData({ Category })
const productData = makeProductData({ Product, Category })

export { userData, roleData, categoryData, productData }
