# 🛍️ Reniel Store

Sistema completo de e-commerce para tienda de ropa, desarrollado con arquitectura de cliente-servidor desacoplada (Frontend React + Backend Node.js).

## 📝 Descripción del Proyecto

Reniel Store es una aplicación web full-stack para la gestión integral de una tienda de ropa online. Incluye funcionalidades tanto para clientes (navegación de productos, carrito, compras, chat con soporte) como para administradores (gestión de inventario, pedidos, usuarios y atención al cliente en tiempo real).

**Proyecto desarrollado para:** Programación Web 1  
**Fecha:** 09/11/2025  
**Repositorio:** [github.com/juanixcopal/Rene_Store](https://github.com/juanixcopal/Rene_Store)

## 🏗️ Arquitectura del Sistema

```
Rene_Store/
├── Frontend/          # Aplicación React (Cliente)
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── config/          # Configuraciones
│   │   ├── data/            # Datos estáticos o mocks
│   │   ├── helpers/         # Utilidades
│   │   ├── hooks/           # Custom Hooks de React
│   │   ├── images/          # Imágenes y assets locales (logo)
│   │   ├── pages/           # Vistas de la aplicación
│   │   ├── provider/        # Context API (Auth, Alert)
│   │   └── theme/           # Material-UI Theme
│   ├── public/
│   └── package.json
│
├── Backend/           # API REST con Node.js (Servidor)
│   ├── models/              # Esquemas de MongoDB
│   ├── src/
│   │   ├── config/          # Configuraciones
│   │   ├── controllers/     # Controladores HTTP
│   │   ├── data/mongodb/    # Capa de acceso a datos
│   │   ├── helpers/         # Funciones auxiliares
│   │   ├── middlewares/     # Middlewares personalizados
│   │   ├── routes/          # Definición de rutas
│   │   ├── server/          # Configuraciones del servidor
│   │   ├── services/        # Lógica de negocio
│   └── package.json
│
└── README.md         # Este archivo
```

### 🎯 Principios Arquitectónicos

**Frontend:**

- **Arquitectura por funcionalidad**: Componentes organizados por feature, no por tipo
- **Context API**: Estado global sin complejidad de Redux
- **Separación de interfaces**: Rutas y componentes distintos para usuario/admin

**Backend:**

- **Arquitectura Hexagonal**: Separación en capas (Controllers → Services → Data → Models)
- **Dependency Injection**: Helpers y services reciben sus dependencias
- **Sistema de servicios dinámicos**: Header `service` determina la operación a ejecutar

## 🚀 Stack Tecnológico Completo

### Frontend

| Tecnología       | Versión | Propósito                |
| ---------------- | ------- | ------------------------ |
| React            | 19.2.0  | Framework UI             |
| React Router DOM | 7.9.5   | Navegación SPA           |
| Material-UI      | 7.3.4   | Sistema de diseño        |
| Emotion          | 11.14.1 | CSS-in-JS para MUI       |
| Axios            | 1.13.1  | Cliente HTTP             |
| JWT-Decode       | 4.0.0   | Decodificación de tokens |
| Socket.io Client | 4.8.1   | WebSockets para chat     |

### Backend

| Tecnología        | Versión | Propósito                  |
| ----------------- | ------- | -------------------------- |
| Node.js           | 22.15.0 | Runtime JavaScript         |
| Express.js        | 4.21.2  | Framework del servidor     |
| MongoDB           | -       | Base de datos NoSQL        |
| Mongoose          | 8.19.2  | ODM para MongoDB           |
| JWT               | 9.0.2   | Autenticación              |
| Bcrypt            | 5.1.1   | Hashing de contraseñas     |
| Cloudinary        | 1.41.3  | Almacenamiento de imágenes |
| Multer            | 2.0.2   | Subida de archivos         |
| Socket.io         | 4.8.1   | Comunicación tiempo real   |
| Express Validator | 7.2.1   | Validación de datos        |
| Helmet            | 8.0.0   | Seguridad HTTP             |
| CORS              | 2.8.5   | Control de acceso          |

## ⚡ Inicio Rápido

### Requisitos Previos

- **Node.js** v22.15.0 o superior
- **MongoDB** v4.4 o superior (corriendo localmente o MongoDB Atlas)
- **Cuenta de Cloudinary** (gratuita) para almacenamiento de imágenes
- **npm**

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/juanixcopal/Rene_Store.git
cd Rene_Store
```

### 2️⃣ Configurar y Ejecutar el Backend

```bash
# Navegar al backend
cd Backend

# Instalar dependencias
npm install

# Crear archivo .env con las siguientes variables
cat > .env << EOF
SERVER_PORT=3050
SERVER_HOST=0.0.0.0
SERVER_TIMEOUT=30s

MONGO_URI=mongodb://localhost:27017/renielstore

JWT_SECRET=tu_secreto_super_seguro_aqui
JWT_EXPIRESIN=6h

BCRYPT_SALT_ROUNDS=10

CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
EOF

# Iniciar MongoDB (si es local)
# Linux/Mac: sudo systemctl start mongodb
# O directamente: mongod

# Iniciar servidor en modo desarrollo
npm run dev
```

✅ El backend estará disponible en `http://localhost:3050`

### 3️⃣ Configurar y Ejecutar el Frontend

**En otra terminal:**

```bash
# Navegar al frontend
cd Frontend

# Instalar dependencias
npm install

# Crear archivo .env
echo "REACT_APP_API_BASE=http://localhost:3050" > .env

# Iniciar aplicación
npm start
```

✅ El frontend se abrirá automáticamente en `http://localhost:3000`

### 4️⃣ Crear Usuario Administrador (Opcional)

Para acceder al panel de administración, necesitas un usuario con rol "Administrador". Puedes:

1. Registrarte como usuario normal
2. Modificar tu rol manualmente en MongoDB:

```bash
mongosh renielstore
db.Users.updateOne(
  { email: "tuemailaqui@example.com" },
  { $set: { rol: "Administrador" } }
)
```

## 📚 Documentación Detallada

Para instrucciones completas de instalación, configuración, decisiones técnicas y desarrollo:

- **[📱 Frontend README](./Frontend/README.md)** - Documentación completa del cliente (13 decisiones técnicas)
- **[⚙️ Backend README](./Backend/Readme.md)** - Documentación completa del servidor (12 decisiones técnicas)

## 🎯 Funcionalidades Principales

### 👤 Panel de Usuario (Cliente)

#### Autenticación

- ✅ Vista unificada login/registro con transición dinámica
- ✅ Sesión persistente con JWT en localStorage
- ✅ Validación automática de token (expiración 6h)
- ✅ Redirección automática según rol del usuario

#### Catálogo y Productos

- ✅ Navegación de productos con información detallada
- ✅ Filtros por categoría y género
- ✅ Imágenes optimizadas desde Cloudinary

#### Carrito de Compras

- ✅ Carrito persistente sincronizado con backend
- ✅ Agregar/eliminar/modificar cantidades
- ✅ Cálculo automático de subtotales y total
- ✅ Resumen de compra antes de confirmar

#### Proceso de Compra

- ✅ Checkout simplificado
- ✅ Creación de pedido desde carrito
- ✅ Snapshot inmutable de datos al momento de compra
- ✅ Historial completo de pedidos

#### Soporte en Tiempo Real

- ✅ Chat en vivo con administradores
- ✅ Mensajes instantáneos con Socket.io
- ✅ Historial de conversaciones

#### Perfil

- ✅ Historial de pedidos

### 👨‍💼 Panel de Administrador

#### Dashboard

- ✅ Estadísticas de ventas
- ✅ Resumen de pedidos
- ✅ Métricas de usuarios

#### Gestión de Productos

- ✅ CRUD completo de productos
- ✅ Subida de imágenes con preview
- ✅ Almacenamiento automático en Cloudinary

#### Gestión de Pedidos

- ✅ Vista de todos los pedidos
- ✅ Detalles completos de cada pedido
- ✅ Información de cliente asociado

#### Gestión de Usuarios

- ✅ Lista de usuarios registrados
- ✅ Ver información de usuarios
- ✅ Gestión de roles

#### Atención al Cliente

- ✅ Chat multiusuario con clientes
- ✅ Vista de todas las conversaciones activas
- ✅ Respuestas en tiempo real
- ✅ Historial de mensajes

## 🌐 Comunicación Frontend-Backend

La aplicación utiliza **dos canales de comunicación complementarios**:

### 1️⃣ HTTP REST API (Axios)

**Propósito:** Operaciones CRUD estándar

**Características:**

- Base URL configurable desde `.env`
- Interceptores de Axios para inyectar JWT automáticamente
- Header personalizado `token` para autenticación
- Header `service` para especificar la operación
- Formato de error estandarizado (RFC 7807)

**Ejemplo de petición:**

```javascript
axios.post('/products', formData, {
  headers: {
    token: localStorage.getItem('token'),
    service: 'create-product'
  }
})
```

### 2️⃣ WebSocket (Socket.io)

**Propósito:** Comunicación bidireccional en tiempo real

**Características:**

- Conexión persistente cliente-servidor
- Mensajería instantánea para chat
- Notificaciones en tiempo real
- Configurado en el mismo servidor que Express

**Flujo de comunicación:**

1. Cliente se conecta al servidor Socket.io
2. Cliente se une a su sala personal (por user_id)
3. Emite eventos para enviar mensajes
4. Escucha eventos para recibir mensajes
5. Los mensajes se guardan en MongoDB para persistencia

## 📊 Base de Datos - MongoDB

### Colecciones y sus Propósitos

| Colección        | Descripción                                | Relaciones                   |
| ---------------- | ------------------------------------------ | ---------------------------- |
| **Users**        | Usuarios del sistema (clientes y admins)   | → Orders, Cart, Conversation |
| **Rol**          | Roles disponibles (Usuario, Administrador) | ← Users                      |
| **Category**     | Categorías de productos (tipo + género)    | ← Product                    |
| **Product**      | Productos de la tienda                     | → Category                   |
| **Cart**         | Items en el carrito de compras             | → Users, Product             |
| **Order**        | Pedidos confirmados (inmutables)           | → Users                      |
| **Conversation** | Conversaciones de chat                     | → Users                      |
| **Message**      | Mensajes individuales del chat             | → Conversation               |

### Diseño de Datos Clave

#### Cart (Carrito)

```javascript
{
  user_id: ObjectId,      // Referencia a Users
  product_id: ObjectId,   // Referencia a Product
  quantity: Number        // Cantidad (min: 1)
}
// Índice único: (user_id, product_id)
```

**Decisión:** Un usuario no puede tener el mismo producto dos veces en el carrito. Se actualiza la cantidad en su lugar.

#### Order (Pedido)

```javascript
{
  user_id: ObjectId,
  items: [{
    product_id: ObjectId,
    name: String,         // Snapshot
    description: String,  // Snapshot
    image: String,        // Snapshot
    category: String,     // Snapshot
    gender: String,       // Snapshot
    quantity: Number,
    price: Number,        // Snapshot
    subtotal: Number      // Calculado
  }],
  total: Number,          // Calculado
  createdAt: Date
}
```

**Decisión:** El pedido guarda un snapshot completo de los datos al momento de la compra. Así, aunque cambien los productos, el pedido mantiene la información histórica exacta.

## 🔐 Seguridad Implementada

### Autenticación y Autorización

- ✅ **JWT con expiración** de 6 horas configurable
- ✅ **Contraseñas hasheadas** con bcrypt (10 salt rounds)
- ✅ **Validación de token** en cada petición protegida
- ✅ **Middleware de roles** para proteger rutas de administrador
- ✅ **Helper de validación** en frontend para detectar tokens expirados

### Seguridad de Datos

- ✅ **Validación server-side** con Express Validator
- ✅ **Sanitización automática** con Express Validator
- ✅ **Índices únicos** en MongoDB para prevenir duplicados
- ✅ **Cálculos en backend** para prevenir manipulación de precios
- ✅ **Formato de errores estandarizado** (RFC 7807)

### Seguridad HTTP

- ✅ **Helmet** para headers de seguridad
- ✅ **CORS** configurado específicamente para el frontend
- ✅ **Compression** para optimizar transferencia de datos
- ✅ **Timeout** de 30s para prevenir peticiones colgadas
- ✅ **Variables de entorno** para credenciales sensibles

### Seguridad de Archivos

- ✅ **Cloudinary** para almacenamiento externo seguro
- ✅ **Validación de formatos** permitidos (jpg, png, jpeg, webp)
- ✅ **Subida directa** sin almacenamiento temporal en servidor
- ✅ **CDN** para entrega rápida y segura de imágenes

## 🎨 Decisiones de Diseño Principales

### 1. Arquitectura Desacoplada (Frontend/Backend Separados)

**Decisión:** Frontend y Backend en carpetas y repositorios lógicamente separados.

**Razones:**

- ✅ **Escalabilidad independiente**: Cada parte puede desplegarse por separado
- ✅ **Desarrollo paralelo**: Frontend y Backend pueden evolucionar independientemente
- ✅ **Flexibilidad de deployment**: Backend puede servir a múltiples clientes
- ✅ **Tecnologías especializadas**: React para UI, Node.js para lógica de servidor
- ✅ **Mantenimiento simplificado**: Bugs en una parte no afectan a la otra

### 2. MongoDB como Base de Datos

**Decisión:** Base de datos NoSQL en lugar de SQL tradicional.

**Razones:**

- ✅ **Flexibilidad de esquemas**: Productos pueden tener atributos variables
- ✅ **Documentos anidados**: Orders guardan snapshot completo sin joins
- ✅ **JSON nativo**: Comunicación directa con Node.js y React
- ✅ **Escalabilidad horizontal**: Preparado para sharding si crece
- ✅ **Desarrollo ágil**: Cambios de esquema sin migraciones complejas

### 3. JWT en localStorage vs Cookies

**Decisión:** JWT almacenado en localStorage del navegador.

**Razones:**

- ✅ **Simplicidad**: Más fácil de implementar que cookies httpOnly
- ✅ **Flexibilidad**: Funciona en cualquier dominio/subdominio
- ✅ **Control del cliente**: Frontend maneja completamente el token

**Trade-off aceptado:** Vulnerable a XSS, pero se mitiga con:

- React escapa HTML automáticamente
- Material-UI componentes seguros
- Express Validator sanitiza inputs

### 4. Material-UI como Sistema de Diseño

**Decisión:** Material-UI en lugar de CSS custom o Tailwind.

**Razones:**

- ✅ **Componentes robustos**: Probados por millones de usuarios
- ✅ **Tema personalizable**: createTheme() para colores de marca
- ✅ **Accesibilidad**: Componentes cumplen estándares WCAG
- ✅ **Ecosystem**: 7000+ iconos en @mui/icons-material
- ✅ **Documentación**: Ejemplos interactivos para todo

### 5. Context API vs Redux

**Decisión:** React Context API para estado global.

**Razones:**

- ✅ **Suficiente para el alcance**: 2 contexts (Auth, Alert) son adecuados
- ✅ **Menos boilerplate**: No necesita actions, reducers, store
- ✅ **Nativo de React**: Sin dependencias adicionales
- ✅ **Curva de aprendizaje**: Más simple que Redux
- ✅ **Performance**: useCallback evita re-renders innecesarios

### 6. Arquitectura Hexagonal en Backend

**Decisión:** Separación en capas: Controllers → Services → Data → Models.

**Razones:**

- ✅ **Separación de responsabilidades**: Cada capa hace una cosa
- ✅ **Testeable**: Services se testean sin Express, Data sin MongoDB real
- ✅ **Mantenible**: Cambiar BD no afecta lógica de negocio
- ✅ **Reutilizable**: Services pueden usarse desde múltiples controllers
- ✅ **Independencia de frameworks**: Lógica de negocio pura

### 7. Sistema de Servicios con Header

**Decisión:** Header `service` para indicar operación en lugar de múltiples rutas.

**Razones:**

- ✅ **Flexibilidad**: Una ruta puede manejar múltiples operaciones
- ✅ **Organización**: Servicios claramente nombrados y separados
- ✅ **Escalabilidad**: Agregar servicios sin crear nuevas rutas
- ✅ **Control explícito**: Frontend especifica exactamente qué necesita

### 8. Socket.io para Chat en Tiempo Real

**Decisión:** WebSockets con Socket.io en lugar de polling.

**Razones:**

- ✅ **Eficiencia**: No hace polling constante al servidor
- ✅ **Tiempo real**: Mensajes instantáneos sin delay
- ✅ **Bidireccional**: Servidor puede empujar datos al cliente
- ✅ **Fallback automático**: Si WebSocket falla, usa long-polling
- ✅ **Persistencia**: Mensajes guardados en MongoDB

### 9. Carrito Gestionado en Backend

**Decisión:** Carrito persistente en MongoDB con cálculos server-side.

**Razones:**

- ✅ **Seguridad**: Precios no manipulables desde el cliente
- ✅ **Multi-dispositivo**: Carrito sincronizado en todos los dispositivos
- ✅ **Integridad**: Stock validado antes de agregar
- ✅ **Auditoría**: Registro de qué había en carrito al comprar
- ✅ **Simplicidad frontend**: Solo muestra datos del servidor

### 10. Pedidos como Snapshots Inmutables

**Decisión:** Order guarda snapshot completo de productos al momento de compra.

**Razones:**

- ✅ **Inmutabilidad**: El pedido nunca cambia aunque cambien los productos
- ✅ **Auditoría**: Registro exacto de qué se vendió y a qué precio
- ✅ **Legal**: Cumple con requisitos de facturación y registros
- ✅ **Histórico**: Se puede ver pedidos antiguos correctamente
- ✅ **Sin joins**: Toda la información en un solo documento

## 🌟 Características Destacadas

### 🎨 Experiencia de Usuario

- Interfaz moderna y responsive (mobile-first)
- Transiciones suaves entre vistas
- Alertas informativas con auto-cierre
- Preview de imágenes antes de subir
- Chat en tiempo real con soporte

### ⚡ Performance

- Code splitting para carga rápida
- Lazy loading de componentes
- Imágenes optimizadas desde CDN
- Compresión de respuestas HTTP
- Índices en MongoDB para queries rápidas

### 🔒 Seguridad

- Arquitectura de seguridad por capas
- Validación en frontend y backend
- Cálculos críticos en servidor
- Formato de errores estandarizado
- Tokens con expiración configurable

### 🏗️ Arquitectura

- Separación clara de responsabilidades
- Código mantenible y escalable
- Dependency injection en backend
- Context API bien estructurado
- Documentación completa del código



[Plataforma en producción](https://rene-store-1.onrender.com/login)

Usuario normal:
gmail: user@gmail.com
password: 123456

Usuario administrador
gmail: admin@gmail.com
password: 123456
