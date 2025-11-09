# Backend - Reniel Store

API REST desarrollada con Node.js y Express para la gestión de una tienda de ropa online.

## 🚀 Tecnologías Utilizadas

- **Node.js** con **Express.js** - Framework del servidor
- **MongoDB** con **Mongoose** - Base de datos NoSQL
- **JWT** - Autenticación y autorización
- **Bcrypt** - Encriptación de contraseñas
- **Cloudinary** - Almacenamiento de imágenes en la nube
- **Socket.io** - Comunicación en tiempo real
- **Express Validator** - Validación de datos
- **Helmet** - Seguridad HTTP
- **CORS** - Control de acceso entre dominios
- **Multer + Multer-Storage-Cloudinary** - Subida de archivos

## 📋 Requisitos Previos

- Node.js (v22.15.0)
- MongoDB (v4.4 o superior)
- Cuenta de Cloudinary (para almacenamiento de imágenes)

## 🔧 Instalación

1. **Clonar el repositorio:**

```bash
git clone https://github.com/juanixcopal/Rene_Store.git
cd Rene_Store/Backend
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Configurar variables de entorno:**

Crear un archivo `.env` en la raíz del backend con las siguientes variables:

```properties
# Configuración del Servidor
SERVER_PORT=3050
SERVER_HOST=0.0.0.0
SERVER_TIMEOUT=30s

# Base de Datos MongoDB
MONGO_URI=mongodb+srv://juanixcopal:cCDTLXuw@cluster0.wuryrva.mongodb.net/

# JWT (JSON Web Tokens)
JWT_SECRET=tu_secreto_super_seguro_aqui
JWT_EXPIRESIN=6h

# Bcrypt
BCRYPT_SALT_ROUNDS=10

# Cloudinary (Almacenamiento de Imágenes)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

**⚠️ IMPORTANTE:** Reemplaza los valores de ejemplo con tus propias credenciales. Nunca subas el archivo `.env` al repositorio.

4. **Iniciar MongoDB:**

Asegúrate de que MongoDB esté ejecutándose en tu sistema:

```bash
# En Linux/Mac
sudo systemctl start mongodb

# O si usas mongod directamente
mongod
```

## ▶️ Ejecución

### Modo Desarrollo

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3050` con **nodemon** para auto-reinicio en cambios.

## 🏗️ Estructura del Proyecto

```
Backend/
├── models/              # Modelos de Mongoose (esquemas de BD)
│   ├── cart.model.js
│   ├── category.model.js
│   ├── chat-conversation.model.js
│   ├── chat-message.model.js
│   ├── order.model.js
│   ├── product.model.js
│   ├── rol.model.js
│   └── user.model.js
├── src/
│   ├── config/          # Configuraciones (Cloudinary, Socket.io)
│   ├── controllers/     # Controladores de las rutas
│   │   ├── cart.controller.js
│   │   ├── category.controller.js
│   │   ├── chat.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── index.js
│   │   ├── orders.controller.js
│   │   ├── product.controller.js
│   │   ├── rol.controller.js
│   │   └── user.controller.js
│   ├── data/
│   │   └── mongodb/     # Capa de acceso a datos (queries)
│   ├── helpers/         # Funciones auxiliares
│   │   ├── encrypt-password.helper.js
│   │   ├── generate-token.helper.js
│   │   └── validate-password.helper.js
│   ├── middlewares/     # Middlewares personalizados
│   │   ├── error.middleware.js
│   │   ├── jwt.middleware.js
│   │   ├── not-found.middleware.js
│   │   ├── rol.middleware.js
│   │   ├── service.middleware.js
│   │   ├── upload.middleware.js
│   │   └── validation.middleware.js
│   ├── routes/          # Definición de rutas
│   ├── server/          # Configuración del servidor Express
│   └── services/        # Lógica de negocio
│       ├── cart/
│       ├── category/
│       ├── chat/
│       ├── dashboard/
│       ├── order/
│       ├── product/
│       ├── rol/
│       └── user/
├── .env                 # Variables de entorno (incluido en git)
├── .gitignore
└── package.json
```

## 🎯 Decisiones de Desarrollo

### 1. **Arquitectura Hexagonal (Ports and Adapters)**

**Decisión:** Implementar una arquitectura en capas inspirada en la arquitectura hexagonal.

**Estructura:**

```
Controllers (Puertos)
    ↓
Services (Lógica de Negocio)
    ↓
Data Layer (Adaptadores - MongoDB)
    ↓
Models (Entidades)
```

**Razones:**

- **Separación de responsabilidades**: Cada capa tiene un propósito claro
- **Testeable**: Fácil mockear la capa de datos para pruebas
- **Mantenible**: Cambios en una capa no afectan las demás
- **Escalable**: Fácil agregar nuevos servicios o cambiar la BD
- **Independencia de frameworks**: La lógica de negocio no depende de Express

**Implementación:**

- **Controllers**: Reciben request/response, delegan a services
- **Services**: Contienen la lógica de negocio pura
- **Data Layer**: Queries y operaciones de MongoDB encapsuladas
- **Helpers**: Funciones puras reutilizables

### 2. **Sistema de Servicios Dinámicos con Header 'service'**

**Decisión:** Usar un header `service` para indicar qué servicio ejecutar en cada petición.

**Middleware de Service:**

```javascript
export default (request, response, next) => {
  const service = request.headers['service']
  if (!service) {
    response.status(400)
    response.setHeader('Content-Type', 'application/problem+json')
    response.send({
      type: 'about:blank',
      message: 'Unspecified service',
      status: 400,
      detail: 'The service has not been specified in the header'
    })
  } else {
    next()
  }
}
```

**Controller genérico:**

```javascript
export default ({ categoryServices }) => {
  return async ({ request, moduleKey }) => {
    if (categoryServices[moduleKey]) {
      const resultService = await categoryServices[moduleKey]({ request })
      return { status: resultService.status || 200, body: resultService }
    }
    // Error si servicio no existe
  }
}
```

**Razones:**

- **Flexibilidad**: Una ruta puede ejecutar múltiples servicios
- **Organización**: Servicios claramente separados y nombrados
- **Escalabilidad**: Fácil agregar nuevos servicios sin crear nuevas rutas
- **Control**: El frontend especifica exactamente qué operación necesita

**Ejemplo de uso:**

```javascript
// Frontend hace petición con header
headers: {
  'service': 'create-category',
  'token': 'jwt_token_here'
}
```

### 3. **Autenticación JWT con Middleware Personalizado**

**Implementación del middleware:**

```javascript
import jwt from 'jsonwebtoken'

export default (request, response, next) => {
  const token = request.headers['token']

  if (!token) {
    response.status(401)
    response.setHeader('Content-Type', 'application/problem+json')
    return response.send({
      type: 'about:blank',
      message: 'Token is required',
      status: 401,
      detail: 'You must provide a valid token in the request header.'
    })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      response.status(401)
      response.setHeader('Content-Type', 'application/problem+json')
      return response.send({
        type: 'about:blank',
        message: 'Your session has expired',
        status: 401,
        detail: err.message
      })
    }

    request.user = decodedToken
    next()
  })
}
```

**Decisión:** JWT en header personalizado llamado `token` (no `Authorization`).

**Razones:**

- **Simplicidad**: Header custom más fácil de manejar en el frontend
- **Decodificación automática**: El token decodificado se inyecta en `request.user`
- **Disponibilidad global**: Cualquier ruta protegida tiene acceso a `request.user`
- **Mensajes claros**: Errores descriptivos con formato RFC 7807 (Problem Details)

**Generación de token:**

```javascript
export default ({ env, jwt }) => {
  return async payload => {
    const { JWT_SECRET, JWT_EXPIRESIN } = env
    const token = jwt.sign(JSON.parse(JSON.stringify(payload)) || {}, JWT_SECRET, {
      expiresIn: JWT_EXPIRESIN
    })
    return token
  }
}
```

### 4. **Middleware de Roles para Autorización**

**Implementación:**

```javascript
export default (request, response, next) => {
  if (!request.user || request.user.rol !== 'Administrador') {
    response.status(403)
    response.setHeader('Content-Type', 'application/problem+json')
    response.send({
      type: 'about:blank',
      message: 'You do not have permission to perform this action.',
      status: 403,
      detail: 'This action is restricted to users with the Administrador role.'
    })
  } else {
    next()
  }
}
```

**Decisión:** Middleware de roles que valida `request.user.rol === 'Administrador'`.

**Razones:**

- **Seguridad por capas**: Autenticación (JWT) + Autorización (Rol)
- **Protección de rutas sensibles**: Solo admins pueden crear/editar/eliminar
- **Claridad**: Error 403 (Forbidden) vs 401 (Unauthorized)
- **Extensible**: Fácil agregar más roles en el futuro

**Uso en rutas:**

```javascript
router.post(
  '/products',
  jwtMiddleware,
  rolMiddleware, // Solo admins
  serviceMiddleware,
  productController
)
```

### 5. **Bcrypt con Salt Rounds Configurable**

**Implementación:**

```javascript
export default ({ env, bcrypt }) => {
  return async password => {
    const { BCRYPT_SALT_ROUNDS } = env
    const salt = bcrypt.genSaltSync(parseInt(BCRYPT_SALT_ROUNDS))
    const hash = bcrypt.hashSync(password, salt)
    return hash
  }
}
```

**Decisión:** Salt rounds configurables desde `.env` (por defecto 10).

**Razones:**

- **Flexibilidad**: Ajustar seguridad según recursos del servidor
- **Balance**: 10 rounds = buen balance entre seguridad y rendimiento
- **Futuro-proof**: Aumentar rounds fácilmente si se necesita más seguridad
- **Dependency injection**: Helper recibe bcrypt y env, fácil de testear

**Validación de contraseña:**

```javascript
export default ({ bcrypt }) => {
  return async (password, hash) => {
    const isValid = bcrypt.compareSync(password, hash)
    return isValid
  }
}
```

### 6. **Subida Directa a Cloudinary con Multer**

**Implementación:**

```javascript
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinary.config.js'

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'reniel_store/products',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
  }
})

const uploadMiddleware = multer({ storage })
```

**Decisión:** Subida directa a Cloudinary sin almacenamiento temporal en servidor.

**Razones:**

- **Eficiencia**: No ocupa espacio en disco del servidor
- **Simplicidad**: Un solo paso (servidor → Cloudinary)
- **Seguridad**: Formatos permitidos validados en el middleware
- **Organización**: Carpeta específica `reniel_store/products`
- **Performance**: Cloudinary optimiza las imágenes automáticamente

**Flujo completo:**

1. Frontend envía FormData con imagen
2. Multer intercepta y sube a Cloudinary
3. Cloudinary retorna URL de la imagen
4. Backend guarda URL en el producto
5. Frontend recibe producto con URL de Cloudinary

### 7. **Gestión de Carrito en Backend con Cálculos Automatizados**

**Modelo del Carrito:**

```javascript
const CartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
})

// Índice único: un usuario no puede tener el mismo producto dos veces
CartSchema.index({ user_id: 1, product_id: 1 }, { unique: true })
```

**Decisión:** Carrito persistente en base de datos con cálculos server-side.

**Razones:**

- **Seguridad**: Precios no manipulables desde el cliente
- **Persistencia**: Carrito disponible en cualquier dispositivo
- **Índice único**: Evita duplicados (un producto = una entrada)
- **Integridad**: Referencias con `populate` para datos actualizados

**Resumen de compra calculado en backend:**

```javascript
async function getCartSummary(userId) {
  const cartItems = await Cart.find({ user_id: userId }).populate({
    path: 'product_id',
    select: 'name price'
  })

  const items = cartItems.map(item => ({
    id: item.product_id._id,
    name: item.product_id.name,
    subtotal: item.quantity * item.product_id.price
  }))

  const total = items.reduce((sum, item) => sum + item.subtotal, 0)

  return { items, total }
}
```

**Ventajas:**

- **Fuente única de verdad**: El frontend solo muestra lo que el backend calcula
- **Preparación para pago**: Totales ya validados
- **Auditoría**: Registro de qué había en el carrito al comprar

### 8. **Sistema de Pedidos (Orders) Generados desde el Carrito**

**Decisión:** Al confirmar compra, crear un documento `Order` con snapshot de los datos del carrito.

**Implementación:**

```javascript
async function createOrderFromCart(userId) {
  const cartItems = await Cart.find({ user_id: userId }).populate({
    path: 'product_id',
    populate: { path: 'category_id', select: 'product gender' },
    select: 'name description image price category_id'
  })

  if (!cartItems.length) {
    throw new Error('El carrito está vacío')
  }

  const items = cartItems.map(item => ({
    product_id: item.product_id._id,
    name: item.product_id.name,
    description: item.product_id.description,
    image: item.product_id.image,
    category: item.product_id.category_id?.product,
    gender: item.product_id.category_id?.gender,
    quantity: item.quantity,
    price: item.product_id.price,
    subtotal: item.quantity * item.product_id.price
  }))

  const total = items.reduce((sum, item) => sum + item.subtotal, 0)

  const order = new Order({ user_id: userId, items, total })
  await order.save()

  // Vaciar carrito después de crear el pedido
  await Cart.deleteMany({ user_id: userId })

  return order
}
```

**Razones:**

- **Snapshot de datos**: El pedido guarda nombre, precio, descripción del momento de compra
- **Inmutabilidad**: Aunque cambien los productos, el pedido no se altera
- **Auditoría**: Registro exacto de qué se vendió y a qué precio
- **Limpieza automática**: El carrito se vacía tras crear el pedido
- **Integridad referencial**: Se mantiene `product_id` por si se necesita

**Nota:** Los pedidos NO tienen estados (pendiente, enviado, etc.) por decisión de simplicidad en esta versión.

### 9. **Validaciones con Express Validator**

**Middleware de validación:**

```javascript
import { validationResult } from 'express-validator'

export default (request, response, next) => {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    response.status(400)
    response.setHeader('Content-Type', 'application/problem+json')
    response.send({
      type: 'about:blank',
      message: 'Fields missing',
      status: 400,
      detail: errors.array()
    })
  } else {
    next()
  }
}
```

**Decisión:** Validaciones declarativas con `express-validator` en las rutas que lo necesitan.

**Razones:**

- **Seguridad**: Validación server-side obligatoria
- **Mensajes claros**: `errors.array()` retorna detalles específicos
- **Declarativo**: Validaciones legibles en las rutas
- **Flexible**: Se aplica solo donde se necesita

**Ejemplo de uso:**

```javascript
router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  validationMiddleware,
  userController
)
```

### 10. **Manejo de Errores Centralizado con RFC 7807**

**Middleware de errores:**

```javascript
export default (error, request, response, next) => {
  const httpStatus = error.status || 500

  return response.status(httpStatus).send({
    type: 'about:blank',
    message: 'Internal server error',
    status: httpStatus,
    detail: error.message
  })
}
```

**Decisión:** Formato estandarizado RFC 7807 (Problem Details for HTTP APIs) para TODAS las respuestas de error.

**Razones:**

- **Estándar industrial**: RFC 7807 es un estándar reconocido
- **Consistencia**: Todos los errores tienen el mismo formato
- **Frontend simplificado**: Siempre espera el mismo objeto
- **Debugging**: `detail` proporciona información técnica

**Formato de respuesta:**

```json
{
  "type": "about:blank",
  "message": "Token is required",
  "status": 401,
  "detail": "You must provide a valid token in the request header."
}
```

**Uso con express-async-errors:**

```javascript
// Cualquier error lanzado en async será capturado
throw new Error('Custom error message')
// El middleware de errores lo formateará automáticamente.
```

### 11. **Sistema de Chat en Tiempo Real con Socket.io**

**Colecciones relacionadas:**

- **Conversation**: Conversación entre un usuario y administradores
- **Message**: Mensajes individuales dentro de una conversación

**Decisión:** Chat bidireccional con persistencia en MongoDB.

**Razones:**

- **Tiempo real**: Mensajes instantáneos sin polling
- **Persistencia**: Historial de conversaciones guardado
- **Escalabilidad**: Socket.io maneja múltiples conexiones eficientemente
- **Auditoría**: Registro completo de interacciones cliente-admin

**Características:**

- Los mensajes se guardan en la base de datos
- Los administradores pueden ver todos los chats activos
- Cada conversación tiene su propio identificador único
- Socket.io está configurado en el mismo servidor que Express

### 12. **Colecciones MongoDB y sus Relaciones**

**Estructura de la base de datos:**

1. **Users**: Usuarios del sistema (clientes y administradores)
2. **Rol**: Roles disponibles (Usuario, Administrador)
3. **Category**: Categorías de productos (tipo y género)
4. **Product**: Productos de la tienda (referencia a Category)
5. **Cart**: Items en el carrito (referencia a Users y Product)
6. **Order**: Pedidos confirmados (snapshot de datos, referencia a Users)
7. **Conversation**: Conversaciones de chat (referencia a Users)
8. **Message**: Mensajes individuales (referencia a Conversation)

**Relaciones clave:**

- Cart → Users (many-to-one)
- Cart → Product (many-to-one)
- Order → Users (many-to-one)
- Product → Category (many-to-one)
- Message → Conversation (many-to-one)
- Conversation → Users
