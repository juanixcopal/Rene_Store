# Frontend - Reniel Store

Aplicación web de tienda de ropa desarrollada con React, ofreciendo una experiencia de usuario moderna e intuitiva tanto para clientes como administradores.

## 🚀 Tecnologías Utilizadas

- **React 19.2.0** - Librería principal
- **React Router DOM** - Navegación y rutas
- **Material-UI (MUI)** - Componentes y diseño
- **Axios** - Cliente HTTP para API
- **JWT-Decode** - Decodificación de tokens
- **Socket.io Client** - Comunicación en tiempo real

## 📋 Requisitos Previos

- Node.js (v22.15.0)
- npm
- Backend de Reniel Store ejecutándose

## 🔧 Instalación

1. **Clonar el repositorio:**

```bash
git clone https://github.com/juanixcopal/Rene_Store.git
cd Rene_Store/Frontend
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Configurar variables de entorno:**

Crear un archivo `.env` en la raíz del frontend:

```properties
REACT_APP_API_BASE=http://localhost:3050
```

**Nota:** Si el backend está en otro puerto u host, ajusta esta variable.

## ▶️ Ejecución

### Modo Desarrollo

```bash
npm start
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

### Build para Producción

```bash
npm run build
```

Esto creará una carpeta `build/` con los archivos optimizados para producción.

## 🎨 Estructura del Proyecto

```
Frontend/
├── public/              # Archivos públicos estáticos
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── admin-app-bar/    # Barra de navegación admin
│   │   └── user-app-bar/     # Barra de navegación usuario
│   ├── config/          # Configuraciones (API, Socket)
│   ├── data/            # Datos estáticos o mocks
│   ├── helpers/         # Funciones helper y utilidades
│   ├── hooks/           # Custom Hooks de React
│   ├── images/          # Imágenes y assets locales (logo)
│   ├── pages/           # Páginas/Vistas de la aplicación
│   │   ├── admin/            # Páginas/Vistas para administrador
│   │   ├── login/            # Página/Vista de login
│   │   └── user/     # Páginas/Vistas para usuario normal
│   ├── provider/        # Context Providers (Auth, Alert)
│   ├── theme/           # Configuración de Material-UI Theme
│   ├── index.css        # Estilos globales
│   └── index.js         # Punto de entrada de la aplicación
├── .env                 # Variables de entorno
├── .gitignore
└── package.json
```

## 🔐 Rutas de la Aplicación

### Rutas Públicas (Usuario)

- `/login` - Inicio de sesión (para admin y para usuario normal)
- `/home` - Catálogo de algunos productos
- `/man` - Catálogo de productos para hombres
- `/woman` - Catálogo de productos para hombres
- `/orders` - Pedidos realizados (historial)
- `/product-details/:id` - Detalles de un producto en específico
- `/cart` - Carrito de compra
- `/chat` - Chat con soporte de la tienda

### Rutas Privadas (Administrador)

- `/admin/dashboard` - Dashboard de la tienda
- `/admin/products` - Catálogo de todos los productos
- `/admin/orders` - Catálogo todos los pedidos realizados por los clientes
- `/admin/users` - Gestión de usuarios dentro de la plataforma
- `/admin/chats` - Chats con todos los clientes

## 🎯 Decisiones de Desarrollo

### 1. **Autenticación con JWT en localStorage**

**Implementación:**

```javascript
// provider/global-provider.js
const [authData, setAuthData] = useState(() => {
  const token = localStorage.getItem('token')
  if (token) {
    return jwtDecode(token)
  } else {
    return ''
  }
})
```

**Decisión:** Almacenar el token JWT en `localStorage` y decodificarlo con `jwt-decode`.

**Razones:**

- **Persistencia**: El usuario no pierde la sesión al recargar la página
- **Simplicidad**: No requiere cookies ni configuración compleja
- **Decodificación local**: Acceso inmediato a datos del usuario (id, rol, etc.) sin consultar el backend
- **Eficiencia**: No se necesita hacer peticiones adicionales para obtener datos básicos del usuario

**Trade-off considerado:**
Aunque localStorage es vulnerable a XSS, se consideró aceptable dado que:

- Es un proyecto educativo
- Material-UI y React sanitizan automáticamente los inputs
- La experiencia de usuario mejora significativamente

### 2. **Helper para Validación de Token**

**Ubicación:** `helpers/validateToken.js`

**Decisión:** Crear una función helper centralizada que valida si el token existe y no ha expirado.

**Razones:**

- **Reutilización**: Un solo lugar para la lógica de validación
- **Mantenibilidad**: Cambios en la lógica se hacen en un solo archivo
- **Seguridad**: Validación consistente en toda la aplicación
- **Experiencia de usuario**: Detecta tokens expirados antes de hacer peticiones fallidas

**Implementación típica:**

```javascript
// helpers/validateToken.js
export const validateToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return false

  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decoded.exp > currentTime
  } catch {
    return false
  }
}
```

### 3. **Vista Unificada de Login/Registro con Componentes Dinámicos**

**Decisión:** Una sola vista (`/login`) que alterna entre formularios de login y registro mediante componentes dinámicos.

**Razones:**

- **UX mejorada**: Transición suave entre login y registro sin cambiar de página
- **Menos código**: No duplicar layout, validaciones y estilos
- **Consistencia visual**: Misma estructura y diseño para ambos formularios
- **Optimización**: Una sola ruta, un solo componente padre

### 4. **Gestión de Carrito en Backend**

**Decisión:** El carrito se actualiza completamente en el backend, incluyendo cálculos de totales y resumen de compra.

**Razones:**

- **Seguridad**: Los precios no pueden ser manipulados desde el cliente
- **Consistencia**: Fuente única de verdad para datos del carrito
- **Performance en Frontend**: No se hacen cálculos pesados en el navegador
- **Simplificación**: El frontend solo muestra lo que el backend le envía
- **Preparación para compra**: Los datos ya están listos para generar el pedido

**Flujo:**

1. Frontend envía acción (agregar/eliminar/actualizar cantidad)
2. Backend procesa, calcula totales, valida stock
3. Backend retorna carrito completo actualizado
4. Frontend solo renderiza los datos recibidos

### 5. **Subida de Imágenes con Preview a Cloudinary**

**Decisión:** Implementar preview de imagen en el frontend antes de subir a Cloudinary vía backend.

**Razones:**

- **Experiencia de usuario**: El admin ve la imagen antes de confirmar
- **Validación visual**: Permite verificar que la imagen es correcta
- **Eficiencia**: Solo se sube si el admin confirma la creación del producto
- **Centralización**: El backend maneja credenciales de Cloudinary de forma segura

**Flujo de subida:**

1. Admin selecciona imagen en el formulario
2. Frontend muestra preview
3. Admin completa los demás datos del producto
4. Al enviar el formulario, la imagen se envía al backend
5. Backend sube a Cloudinary usando `multer` y `multer-storage-cloudinary`
6. Backend recibe URL de Cloudinary y la guarda con el producto
7. Frontend recibe confirmación y muestra el producto creado

### 6. **AuthProvider con Context API**

**Implementación completa:**

```javascript
export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const token = localStorage.getItem('token')
    if (token) {
      return jwtDecode(token)
    } else {
      return ''
    }
  })

  const setToken = token => {
    localStorage.setItem('token', token)
    setAuthData(jwtDecode(token))
  }

  const rolAccess = {
    administrador: true,
    usuario: false
  }

  return (
    <AuthContext.Provider value={{ authData, setToken, rolAccess }}>
      {children}
    </AuthContext.Provider>
  )
}
```

**Decisión:** Crear un Provider que encapsula toda la lógica de autenticación.

**Razones:**

- **Estado global**: Cualquier componente puede acceder a `authData`
- **Inicialización automática**: Lee el token al cargar la app
- **Método centralizado**: `setToken()` para guardar y decodificar
- **Control de acceso**: `rolAccess` define permisos por rol
- **Simplicidad**: No necesita Redux para este caso de uso

**Uso en componentes:**

```javascript
const { authData, rolAccess } = useContext(AuthContext)
const isAdmin = authData.rol === 'administrador'
```

### 7. **AlertProvider para Notificaciones Globales**

**Implementación completa:**

```javascript
const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: '' // 'success', 'error', 'warning', 'info'
  })

  const handleClose = () => {
    setAlert({ ...alert, open: false })
  }

  const showAlert = useCallback((message, severity = 'success') => {
    setAlert({ open: true, message, severity })
    setTimeout(() => {
      setAlert({ ...alert, open: false })
    }, 2000)
  }, [])

  return (
    <AlertContext.Provider value={showAlert}>
      {alert.open && (
        <div style={{ marginBottom: '20px' }}>
          <Alert onClose={handleClose} severity={alert.severity}>
            {alert.message}
          </Alert>
        </div>
      )}
      {children}
    </AlertContext.Provider>
  )
}

export const useAlert = () => useContext(AlertContext)
```

**Decisión:** Sistema de alertas centralizado con auto-cierre a los 2 segundos.

**Razones:**

- **UX consistente**: Todas las alertas se ven igual en toda la app
- **Simplicidad de uso**: Un solo hook `useAlert()` en cualquier componente
- **Auto-cierre**: Las alertas desaparecen automáticamente (2000ms)
- **Material-UI Alert**: Componente accesible y responsivo
- **Flexible**: Soporta 4 tipos de severidad (success, error, warning, info)

**Uso en componentes:**

```javascript
const showAlert = useAlert()

// En cualquier función
showAlert('Producto agregado al carrito', 'success')
showAlert('Error al procesar el pago', 'error')
```

### 8. **Redirección Basada en Rol (Backend-Driven)**

**Decisión:** Después del login, el backend determina la redirección según el rol del usuario.

**Razones:**

- **Seguridad**: El frontend no decide a dónde ir, el backend lo indica
- **Centralización**: La lógica de roles está en el backend
- **Simplicidad**: El frontend solo sigue las instrucciones del backend

**Flujo:**

1. Usuario envía credenciales
2. Backend valida y genera JWT con el rol
3. Backend responde con token + ruta sugerida (`/admin/dashboard` o `/home`)
4. Frontend guarda token y navega a la ruta indicada

### 9. **Socket.io para Chat en Tiempo Real**

**Decisión:** Implementar sistema de chat bidireccional entre clientes y administradores usando Socket.io.

**Características:**

- **Tiempo real**: Mensajes instantáneos sin recargar página
- **Persistencia**: Los mensajes se guardan en la base de datos
- **Sala por usuario**: Cada cliente tiene su propia sala de chat
- **Notificaciones**: Los admins reciben notificación de nuevos mensajes
- **Historial**: Se puede ver conversaciones anteriores

**Razones:**

- **Soporte directo**: Comunicación inmediata entre clientes y tienda
- **Experiencia premium**: Atención personalizada en tiempo real
- **Conversión**: Resolver dudas al instante aumenta ventas
- **Tecnología probada**: Socket.io es estándar para WebSockets

### 10. **Separación de Interfaces (Usuario/Admin)**

**Implementación en index.js:**

```javascript
const App = () => {
  const isAdminRoute = window.location.pathname.startsWith('/admin')

  return (
    <BrowserRouter>
      {isAdminRoute ? (
        <AdminAppBar>
          <AlertProvider>
            <AdminRoutes />
          </AlertProvider>
        </AdminAppBar>
      ) : (
        <UserAppBar>
          <AlertProvider>
            <UserRoutes />
          </AlertProvider>
        </UserAppBar>
      )}
    </BrowserRouter>
  )
}
```

**Decisión:** Dos sistemas de navegación completamente separados según la URL.

**Razones:**

- **Experiencias diferenciadas**: UI específica para cada tipo de usuario
- **Organización del código**: Componentes y rutas separados
- **Rendimiento**: Solo carga los componentes necesarios
- **Mantenimiento**: Cambios en admin no afectan al usuario y viceversa
- **Seguridad**: Separación física de funcionalidades sensibles

### 11. **Material-UI como Sistema de Diseño**

**Configuración personalizada** en `theme/index.js` usando `createTheme`:

**Decisión:** Material-UI (MUI) como framework de componentes.

**Razones:**

- **Componentes robustos**: Probados por millones de usuarios
- **Tema personalizable**: `createTheme()` permite brand colors
- **Icons integrados**: `@mui/icons-material` con cientos de iconos
- **Ecosystem**: Amplia comunidad y plugins

### 12. **React Router v7 para Navegación**

**Decisión:** Usar React Router para manejo de rutas SPA.

**Implementación:**

- **Rutas dinámicas**: `/products/:id` para detalles de productos
- **Navegación programática**: `useNavigate()` después de acciones
- **Rutas protegidas**: Verificación de autenticación antes de renderizar
- **Lazy loading**: Componentes pesados se cargan bajo demanda

### 13. **Axios como Cliente HTTP**

**Decisión:** Axios en lugar de fetch nativo.

**Razones:**

- **Interceptores**: Headers automáticos (JWT en cada petición)
- **Base URL**: Configuración centralizada desde `.env`
- **Manejo de errores**: Catch global de errores HTTP
- **Transformación automática**: JSON parsing automático
- **Cancelación de peticiones**: Útil para búsquedas

**Configuración típica:**

```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

## 🔒 Seguridad Frontend

- **Validación de formularios**: Client-side antes de enviar
- **Sanitización automática**: React escapa HTML por defecto
- **Validación de token**: Helper que verifica expiración
- **Protected Routes**: Redirección si no autenticado o sin permisos
- **HTTPS en producción**: Siempre usar conexiones seguras
- **Headers de seguridad**: Configurados en el backend

## 🐛 Troubleshooting

### Error: "Network Error" al hacer peticiones

- Verificar que el backend esté ejecutándose
- Confirmar que `REACT_APP_API_BASE` en `.env` sea correcta
- Revisar la consola del navegador para errores CORS

### Socket.io no conecta

- Verificar que el backend tenga Socket.io configurado
- Confirmar que la URL de conexión sea correcta
- Revisar la consola para errores de conexión

## 📱 Características Principales

### Para Usuarios

- ✅ Catálogo de productos con categorias
- ✅ Carrito de compras persistente
- ✅ Proceso de checkout
- ✅ Historial de pedidos
- ✅ Chat en tiempo real con soporte Reniel Store

### Para Administradores

- ✅ Dashboard con estadísticas
- ✅ CRUD de productos
- ✅ Historial de todos los pedidos
- ✅ Gestión de usuarios
- ✅ Subida de imágenes
- ✅ Chat en tiempo real con los usuarios

## 📝 Buenas Prácticas Implementadas

1. **Hooks personalizados** para lógica reutilizable
2. **Componentes funcionales** en lugar de clases
3. **ESLint** configurado
4. **Git flow** con commits descriptivos

# Integración con GraphQL (ENTREGA 2)

El frontend ahora soporta tanto la API REST como GraphQL del backend. La migración es gradual y ambas conviven sin problemas.

**Configuración**
La misma instancia de Axios se utiliza para ambas APIs:

```javascript
// config/data-source.js
export const instanceAPIRenielStoreGraphql = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE}/graphql`,
  headers: {
    'Content-Type': 'application/json',
    token: localStorage.getItem('token')
  }
})
```

## Módulos migrados a GraphQL

**🛒 Cart (Carrito)**
Las funciones de carrito ahora usan GraphQL en lugar de REST:

```javascript
// Antes (REST)
export const getCartSummary = async () => {
  return await instanceAPIRenielStoreGraphql.get('/cart/query', {
    headers: { service: 'cart-summary' }
  })
}

// Ahora (GraphQL)
export const getCartSummary = async () => {
  const response = await instanceAPIRenielStoreGraphql.post('/graphql', {
    query: `
      query {
        getCartSummary {
          items { id name subtotal }
          total
        }
      }
    `
  })

  return {
    data: response.data.data.getCartSummary
  }
}
```

**Funciones migradas**

- getProductsInCart() → Query getCartProducts
- getCartSummary() → Query getCartSummary
- postDecreaseQuantityProduct() → Mutation decreaseProduct
- postBuyCart() → Mutation buyCart

**👥 User (Usuarios)**

Las funciones de gestión de usuarios ahora usan GraphQL:

```javascript
// Antes (REST)
export const getAllAdminUsers = async () => {
  return await instanceAPIRenielStoreGraphql.get('/user/query', {
    headers: { service: 'all-admin-users' }
  })
}

// Ahora (GraphQL)
export const getAllAdminUsers = async () => {
  const response = await instanceAPIRenielStoreGraphql.post('/graphql', {
    query: `
      query {
        getAllAdmins {
          _id
          user_name
          user_lastname
          email
          rol_id { rol }
        }
      }
    `
  })

  return {
    data: response.data.data.getAllAdmins
  }
}
```

**Funciones migradas**

- getAllAdminUsers() → Query getAllAdmins
- getAllUserUsers() → Query getAllUsers
- getAllRoles() → Query getAllRoles
- postCreateUser() → Mutation createUser
- putEditUser() → Mutation updateUser

**Uso de variables en Mutations**

Para las mutations con parámetros, ahora usamos variables de GraphQL:

```javascript
export const postCreateUser = async ({ dataNewUser, showAlert, ... }) => {
  await instanceAPIRenielStoreGraphql.post('/graphql', {
    query: `
      mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
          result
          message
          user { _id user_name email }
        }
      }
    `,
    variables: {
      input: {
        user_name: dataNewUser.user_name,
        user_lastname: dataNewUser.user_lastname,
        email: dataNewUser.email,
        password: dataNewUser.password,
        rol: dataNewUser.rol
      }
    }
  })
  .then(({ data }) => {
    const result = data.data.createUser
    if (result.result) {
      showAlert(result.message, 'success')
      // Refrescar datos...
    }
  })
}
```

**Manejo de Errores en GraphQL**

GraphQL devuelve errores en un formato diferente a REST:

```javascript
// REST
.catch(error => {
  if (error.response?.data?.message) {
    showAlert(error.response.data.message, 'warning')
  }
})

// GraphQL
.catch(error => {
  if (error.response?.data?.errors) {
    const errorMessage = error.response.data.errors[0].message
    showAlert(errorMessage, 'warning')
  }
})
```
