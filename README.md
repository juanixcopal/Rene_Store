# 🛍️ Rene Store

Sistema completo de e-commerce para tienda de ropa, desarrollado con arquitectura de cliente-servidor desacoplada. El proyecto cuenta con **dos frontends** independientes que consumen el mismo backend.

## 📝 Descripción del Proyecto

Rene Store es una aplicación web full-stack para la gestión integral de una tienda de ropa online. Incluye funcionalidades tanto para clientes (navegación de productos, carrito, compras, chat con soporte) como para administradores (gestión de inventario, pedidos, usuarios y atención al cliente en tiempo real).

**Programación Web 1** — Frontend React + Backend Node.js  
**Programación Web 2 (Práctica 1)** — Frontend Svelte 5 consumiendo el backend Node.js  
**Programación Web 2 (Práctica 2)** — Backend Python/FastAPI que reemplaza al Node.js, compatible con el frontend Svelte 5 sin modificaciones  
**Repositorio:** [github.com/juanixcopal/Rene_Store](https://github.com/juanixcopal/Rene_Store)

## 🏗️ Arquitectura del Sistema

```
Rene_Store/
├── Frontend/              # Aplicación React (PW1 — cliente completo con carrito y chat)
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── hooks/             # Custom Hooks de React
│   │   ├── pages/             # Vistas (admin y usuario)
│   │   ├── provider/          # Context API (Auth, Alert)
│   │   └── theme/             # Material-UI Theme
│   └── package.json
│
├── Frontend-Svelte/       # Aplicación Svelte 5 (PW2 Práctica 1 — gestión de productos y usuarios)
│   ├── src/
│   │   ├── lib/
│   │   │   ├── stores/        # Estado global con $state() (auth, router, toast)
│   │   │   └── services/      # Llamadas a la API con Axios
│   │   ├── components/        # Componentes reutilizables con $props() y callbacks
│   │   ├── pages/             # Vistas: Login, Products, ProductDetail, Profile, Users
│   │   ├── App.svelte         # Raíz: router + guards de ruta con $effect()
│   │   └── app.css            # Design system con variables CSS
│   └── package.json
│
├── Backend/               # API REST con Node.js (PW1 — backend original completo)
│   ├── models/                # Esquemas de MongoDB (8 colecciones)
│   ├── src/
│   │   ├── config/            # Configuraciones (Cloudinary, Socket.io, env)
│   │   ├── controllers/       # Controladores HTTP
│   │   ├── data/mongodb/      # Capa de acceso a datos
│   │   ├── graphql/           # Apollo Server + esquemas GraphQL
│   │   ├── middlewares/       # JWT, roles, validación, service selector
│   │   ├── routes/            # Definición de rutas
│   │   ├── services/          # Lógica de negocio
│   │   └── server/            # Inicialización del servidor Express
│   └── package.json
│
├── Backend-Python/        # ✨ NUEVO — API REST con Python/FastAPI (PW2 Práctica 2)
│   ├── main.py                # Punto de entrada FastAPI
│   ├── requirements.txt
│   ├── AI_DOCUMENTATION.md   # Memoria de uso de IA (prompts, errores, análisis)
│   ├── static/uploads/        # Imágenes subidas de productos
│   └── app/
│       ├── core/              # Config, JWT, dependencias, excepciones globales
│       ├── database/          # SQLAlchemy engine + seed de datos iniciales
│       ├── models/            # Modelos ORM: Role, User, Category, Product
│       ├── schemas/           # Esquemas Pydantic para validación de inputs
│       ├── repositories/      # Capa de acceso a datos (patrón repositorio)
│       ├── services/          # Lógica de negocio
│       ├── routers/           # Controladores HTTP (mismo contrato que Node.js)
│       └── helpers.py         # Serialización de respuestas JSON (_id style)
│
└── README.md              # Este archivo
```

### 🎯 Principios Arquitectónicos

**Frontend React (PW1):**

- **Arquitectura por funcionalidad**: Componentes organizados por feature, no por tipo
- **Context API**: Estado global sin complejidad de Redux
- **Separación de interfaces**: Rutas y componentes distintos para usuario/admin

**Frontend Svelte 5 (PW2):**

- **Runes**: `$state()`, `$derived()`, `$effect()`, `$props()` para reactividad explícita
- **Stores como módulos**: Estado global compartido sin Context API
- **Router SPA propio**: Hash routing sin depender de SvelteKit
- **CSS puro con design tokens**: Variables CSS reutilizables sin frameworks externos

**Backend Node.js (PW1):**

- **Arquitectura Hexagonal**: Separación en capas (Controllers → Services → Data → Models)
- **Dependency Injection**: Helpers y services reciben sus dependencias
- **Sistema de servicios dinámicos**: Header `service` determina la operación a ejecutar

**Backend Python/FastAPI (PW2 Práctica 2):**

- **Arquitectura limpia en 5 capas**: Routers → Services → Repositories → Models + Schemas
- **Patrón Repositorio**: Acceso a datos encapsulado, la lógica de negocio no toca la BD directamente
- **Validación con Pydantic v2**: Errores 422 automáticos en inputs inválidos
- **Manejador global de excepciones**: Traduce excepciones de negocio a respuestas HTTP limpias
- **Compatibilidad total**: Mismo contrato de API que el backend Node.js → el frontend Svelte 5 funciona sin cambios

## 🚀 Stack Tecnológico Completo

### Frontend React (PW1)

| Tecnología       | Versión | Propósito                |
| ---------------- | ------- | ------------------------ |
| React            | 19.2.0  | Framework UI             |
| React Router DOM | 7.9.5   | Navegación SPA           |
| Material-UI      | 7.3.4   | Sistema de diseño        |
| Emotion          | 11.14.1 | CSS-in-JS para MUI       |
| Axios            | 1.13.1  | Cliente HTTP             |
| JWT-Decode       | 4.0.0   | Decodificación de tokens |
| Socket.io Client | 4.8.1   | WebSockets para chat     |

### Frontend Svelte 5 (PW2)

| Tecnología    | Versión | Propósito                             |
| ------------- | ------- | ------------------------------------- |
| Svelte        | 5.x     | Framework UI con sistema de runes     |
| Vite          | 6.x     | Bundler y servidor de desarrollo      |
| Axios         | 1.x     | Cliente HTTP con interceptores        |
| Google Fonts  | —       | Tipografías: Playfair Display + Inter |

### Backend Node.js (PW1 — original completo)

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

### Backend Python/FastAPI (PW2 Práctica 2 — sustituto del Node.js)

| Tecnología      | Versión | Propósito                                     |
| --------------- | ------- | --------------------------------------------- |
| Python          | 3.12    | Lenguaje del servidor                         |
| FastAPI         | 0.136+  | Framework HTTP asíncrono                      |
| SQLAlchemy      | 2.0+    | ORM para acceso a datos                       |
| SQLite          | -       | Base de datos relacional (sin configuración)  |
| Pydantic v2     | 2.x     | Validación de datos + errores 422 automáticos |
| python-jose     | 3.x     | Generación y validación de JWT                |
| bcrypt          | 4.x     | Hashing seguro de contraseñas                 |
| uvicorn         | 0.48+   | Servidor ASGI                                 |

## ⚡ Inicio Rápido

### Requisitos Previos

- **Node.js** v22.15.0 o superior (para el backend Node.js y los frontends)
- **Python** v3.12 o superior (para el backend Python/FastAPI)
- **MongoDB** v4.4 o superior (solo necesario para el backend Node.js)
- **Cuenta de Cloudinary** (solo necesaria para el backend Node.js)
- **npm** y **pip**

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/juanixcopal/Rene_Store.git
cd Rene_Store
```

---

## 🐍 Backend Python/FastAPI — Práctica 2 (recomendado)

> Este backend reemplaza al Node.js. El frontend Svelte 5 funciona sin ningún cambio.

### Arrancar el backend Python

```bash
cd Backend-Python

# Instalar dependencias
pip install -r requirements.txt

# Iniciar el servidor (puerto 3050, igual que el Node.js)
python -m uvicorn main:app --host 0.0.0.0 --port 3050 --reload
```

✅ API disponible en `http://localhost:3050`  
✅ Documentación interactiva en `http://localhost:3050/docs`  
✅ La base de datos SQLite y los datos de ejemplo se crean **automáticamente** al primer arranque.

### Arrancar el frontend Svelte 5 (apuntando al backend Python)

```bash
cd Frontend-Svelte
npm install
# El .env ya apunta a http://localhost:3050/api — sin cambios necesarios
npm run dev
```

✅ Frontend disponible en `http://localhost:5173`

### Usuarios por defecto (backend Python)

| Email | Contraseña | Rol |
|---|---|---|
| admin@gmail.com | 123456 | Administrador |
| user@gmail.com | 123456 | Usuario |

---

## 🟢 Backend Node.js — PW1 (backend original)

### 2️⃣ Configurar y Ejecutar el Backend Node.js

```bash
cd Backend
npm install

# Crear archivo .env
# SERVER_PORT=3050
# MONGO_URI=mongodb://localhost:27017/renielstore
# JWT_SECRET=tu_secreto_super_seguro_aqui
# JWT_EXPIRESIN=6h
# BCRYPT_SALT_ROUNDS=10
# CLOUDINARY_CLOUD_NAME=...
# CLOUDINARY_API_KEY=...
# CLOUDINARY_API_SECRET=...

npm run dev
```

✅ El backend estará disponible en `http://localhost:3050`

### 3️⃣ Configurar y Ejecutar el Frontend React (PW1)

```bash
cd Frontend
npm install
echo "REACT_APP_API_BASE=http://localhost:3050" > .env
npm start
```

✅ Disponible en `http://localhost:3000`

### 4️⃣ Configurar y Ejecutar el Frontend Svelte 5

```bash
cd Frontend-Svelte
npm install
# El archivo .env ya está creado con: VITE_API_BASE=http://localhost:3050/api
npm run dev
```

✅ Disponible en `http://localhost:5173`

## 📚 Documentación Detallada

Cada carpeta tiene su propio README con instrucciones de instalación, estructura, decisiones técnicas y más:

- **[📱 Frontend React README](./Frontend/README.md)** — Documentación del cliente React (PW1)
- **[⚡ Frontend Svelte 5 README](./Frontend-Svelte/README.md)** — Documentación del cliente Svelte 5 (PW2): runes usadas, endpoints, estructura y decisiones técnicas
- **[⚙️ Backend Node.js README](./Backend/Readme.md)** — Documentación del servidor Node.js (PW1)
- **[🐍 Backend Python README](./Backend-Python/README.md)** — Documentación del servidor FastAPI (PW2 Práctica 2): arquitectura en capas, endpoints, instalación
- **[🤖 Documentación de IA](./Backend-Python/AI_DOCUMENTATION.md)** — Memoria del uso de IA: prompts utilizados, refinamientos e identificación de errores/alucinaciones

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
