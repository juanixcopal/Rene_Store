# Reniel Store — Frontend Svelte 5

Frontend SPA de la tienda de ropa **Reniel Store**, construido con **Svelte 5 + Vite** como parte de la práctica de Programación Web 2. Consume la API REST del backend existente de Node.js y demuestra el uso de las nuevas APIs de Svelte 5 (runes).

---

## Índice

1. [Descripción general](#descripción-general)
2. [Stack tecnológico](#stack-tecnológico)
3. [Estructura de carpetas](#estructura-de-carpetas)
4. [Runes de Svelte 5](#runes-de-svelte-5)
5. [Endpoints del backend utilizados](#endpoints-del-backend-utilizados)
6. [Funcionalidades implementadas](#funcionalidades-implementadas)
7. [Instalación y ejecución](#instalación-y-ejecución)
8. [Variables de entorno](#variables-de-entorno)
9. [Decisiones técnicas](#decisiones-técnicas)

---

## Descripción general

Esta aplicación es el **segundo frontend** del proyecto Reniel Store. Mientras que el primero fue construido en React con Material-UI para Programación Web 1, este nuevo frontend se centra en:

- Usar **Svelte 5** con su nuevo modelo de reactividad basado en runes
- Implementar un **router SPA** propio sin depender de SvelteKit
- Consumir la misma API REST del backend Node.js con JWT
- Ofrecer un diseño profesional de tienda de ropa online

La aplicación tiene dos roles de usuario:

- **Administrador** — puede crear, editar y eliminar productos; gestionar usuarios; ver el catálogo completo con filtros avanzados.
- **Usuario** — puede ver el catálogo de productos, ver el detalle de cada uno y gestionar su perfil.

---

## Stack tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| Svelte | 5.x | Framework UI con sistema de runes |
| Vite | 6.x | Bundler y servidor de desarrollo |
| Axios | 1.x | Cliente HTTP con interceptores automáticos |
| Google Fonts | — | Tipografías: Playfair Display + Inter |

No se usa ningún framework de componentes UI externo. Todo el diseño es **CSS puro con variables CSS** (design tokens), manteniendo los mismos colores de marca del frontend React.

---

## Estructura de carpetas

```
Frontend-Svelte/
├── src/
│   │
│   ├── lib/                          # Lógica reutilizable (no visual)
│   │   ├── stores/
│   │   │   ├── auth.svelte.js        # Estado global de autenticación + persistencia en localStorage
│   │   │   ├── router.svelte.js      # Router SPA basado en hash (window.location.hash)
│   │   │   └── toast.svelte.js       # Sistema de notificaciones globales
│   │   │
│   │   └── services/
│   │       ├── api.js                # Instancia Axios + interceptores (JWT automático, errores globales)
│   │       ├── auth.service.js       # Llamadas a la API de autenticación
│   │       ├── product.service.js    # Llamadas a la API de productos (CRUD)
│   │       ├── user.service.js       # Llamadas a la API de usuarios
│   │       └── category.service.js   # Llamadas a la API de categorías
│   │
│   ├── components/                   # Componentes reutilizables
│   │   ├── Navbar.svelte             # Barra de navegación fija con menú responsivo
│   │   ├── ProductCard.svelte        # Tarjeta de producto con acciones (editar/borrar para admin)
│   │   ├── ProductForm.svelte        # Modal de crear / editar producto con subida de imagen
│   │   ├── UserRow.svelte            # Fila de tabla para la gestión de usuarios
│   │   ├── UserForm.svelte           # Modal de crear / editar usuario
│   │   └── Toast.svelte              # Contenedor flotante de notificaciones
│   │
│   ├── pages/                        # Vistas/pantallas de la aplicación
│   │   ├── Login.svelte              # Pantalla de inicio de sesión (split-screen)
│   │   ├── Products.svelte           # Catálogo con filtros combinados y paginación
│   │   ├── ProductDetail.svelte      # Detalle completo de un producto
│   │   ├── Profile.svelte            # Perfil del usuario autenticado con accesos rápidos
│   │   ├── Users.svelte              # Gestión de usuarios (solo administrador)
│   │   └── NotFound.svelte           # Página 404
│   │
│   ├── App.svelte                    # Componente raíz: renderiza el router y los guards de ruta
│   ├── app.css                       # Design system global: tokens, reset, botones, inputs, grid
│   └── main.js                       # Punto de entrada de Vite
│
├── .env                              # Variables de entorno (VITE_API_BASE)
├── vite.config.js                    # Configuración de Vite
└── package.json
```

### Flujo de la aplicación

```
main.js
  └── monta App.svelte
        ├── $effect() → guard de rutas (redirige si no hay sesión)
        ├── Si no autenticado → Login.svelte
        └── Si autenticado →
              ├── Navbar.svelte (fija, muestra nombre y rol)
              └── Página activa según router.currentPage:
                    ├── /products       → Products.svelte
                    ├── /products/:id   → ProductDetail.svelte
                    ├── /profile        → Profile.svelte
                    ├── /users          → Users.svelte (solo admin)
                    └── *               → NotFound.svelte
```

---

## Runes de Svelte 5

Las runes son la nueva forma de manejar reactividad en Svelte 5. A diferencia de Svelte 4 donde la reactividad era implícita (cualquier `let` era reactivo en un componente), en Svelte 5 la reactividad es explícita mediante estas funciones especiales.

### `$state()` — Estado reactivo

Declara una variable reactiva. Cuando cambia, Svelte actualiza automáticamente la UI que la usa.

**Dónde se usa:**

| Archivo | Variables con `$state()` |
|---|---|
| `auth.svelte.js` | `token`, `user` — el JWT y los datos decodificados del usuario |
| `toast.svelte.js` | `toasts` — array de notificaciones activas |
| `router.svelte.js` | `path` — la ruta actual leída del hash de la URL |
| `Login.svelte` | `email`, `password`, `loading`, `errors` |
| `Products.svelte` | `products`, `categories`, `loading`, `search`, `filterCategory`, `filterStatus`, `priceMin`, `priceMax`, `currentPage`, `showForm`, `editProduct`, `deleteId`, `deleteLoading` |
| `ProductDetail.svelte` | `product`, `loading`, `showEdit` |
| `Profile.svelte` | (solo lectura del store de auth) |
| `Users.svelte` | `users`, `loading`, `search`, `filterRole`, `showForm`, `editUser`, `deleteUser`, `deleteLoading` |
| `ProductForm.svelte` | `name`, `description`, `price`, `stock`, `category_id`, `imageFile`, `imagePreview`, `loading`, `errors` |
| `UserForm.svelte` | `user_name`, `user_lastname`, `email`, `password`, `rol`, `loading`, `errors` |

### `$derived()` — Valores derivados

Calcula un valor a partir de otro estado reactivo. Se recalcula automáticamente cuando cambia alguna dependencia. La clave es que **no llama a la API de nuevo**: trabaja sobre los datos ya cargados en memoria.

**Dónde se usa y para qué:**

| Archivo | `$derived()` | Descripción |
|---|---|---|
| `auth.svelte.js` | `isAuthenticated` | `true` si hay token y usuario válidos |
| `auth.svelte.js` | `isAdmin` | `true` si el rol es "Administrador" |
| `Navbar.svelte` | `displayName` | Nombre + apellido del usuario para el chip |
| `ProductCard.svelte` | `isActive` | `!product.isDeleted` — si el producto está activo |
| `ProductCard.svelte` | `priceText` | Precio formateado como `$1,299` |
| `ProductDetail.svelte` | `isActive` | Estado del producto en la vista de detalle |
| `ProductDetail.svelte` | `priceText` | Precio formateado en el detalle |
| `Products.svelte` | `filtered` | Lista filtrada por texto + categoría + estado + rango de precio |
| `Products.svelte` | `totalPages` | `Math.ceil(filtered.length / 12)` |
| `Products.svelte` | `paginated` | Slice de `filtered` para la página actual |
| `Products.svelte` | `priceRange` | `{ min, max }` del catálogo completo (para los placeholders) |
| `Products.svelte` | `hasFilters` | `true` si algún filtro está activo |
| `Users.svelte` | `filtered` | Usuarios filtrados por nombre/correo y rol |
| `Users.svelte` | `userCount` | Cantidad de resultados |
| `Profile.svelte` | `displayName` | Nombre completo del usuario |
| `Profile.svelte` | `initials` | Primeras letras del nombre y apellido |
| `UserRow.svelte` | `initials`, `fullName`, `rol`, `isAdmin` | Datos derivados para la fila de tabla |
| `ProductForm.svelte` | `isEdit` | `true` si se pasó un producto existente (modo edición) |
| `UserForm.svelte` | `isEdit` | `true` si se pasó un usuario existente (modo edición) |

### `$effect()` — Efectos secundarios

Ejecuta código cuando cambian sus dependencias. Se usa para sincronizar el estado con el mundo exterior (API, localStorage, URL).

| Archivo | Efecto |
|---|---|
| `App.svelte` | Si `auth.isAuthenticated` es falso y la página no es login → navega a `/login`. Si es verdadero y está en login → navega a `/products` |
| `Products.svelte` | Cuando `auth.isAuthenticated` cambia a `true` → llama a `loadData()` para cargar productos y categorías |
| `Products.svelte` | Cuando cambia cualquier filtro (`search`, `filterCategory`, `filterStatus`, `priceMin`, `priceMax`) → resetea `currentPage` a 1 |
| `ProductDetail.svelte` | Cuando cambia el `id` (prop) → llama a `load()` para obtener el producto del backend |

### `$props()` — Definición de props con callbacks

Define qué props acepta un componente. Los callbacks son funciones que el hijo puede llamar para comunicar acciones al padre, en lugar de usar eventos personalizados (`dispatch`).

| Componente | Props | Callbacks |
|---|---|---|
| `ProductCard.svelte` | `product` | `onEdit(product)` — el padre abre el formulario de edición; `onDelete(id)` — el padre muestra la confirmación |
| `ProductForm.svelte` | `product` (opcional), `categories` | `onSave()` — el padre recarga los datos; `onClose()` — el padre cierra el modal |
| `UserRow.svelte` | `user` | `onEdit(user)` — el padre abre el formulario; `onDelete(user)` — el padre muestra la confirmación |
| `UserForm.svelte` | `user` (opcional) | `onSave()` — el padre recarga los datos; `onClose()` — el padre cierra el modal |
| `Navbar.svelte` | — | `onLogout()` — callback opcional |

### `untrack()` — Lectura sin dependencia reactiva

Importado de `'svelte'`. Lee el valor actual de un estado sin registrar una dependencia, evitando el warning `state_referenced_locally` de Svelte 5.

Se usa en `ProductForm.svelte` y `UserForm.svelte` para inicializar el formulario con los datos del prop recibido. Esto es correcto porque estos modales **siempre se destruyen y recrean** al abrirse (están dentro de `{#if}`), por lo que capturar el valor inicial una sola vez es exactamente el comportamiento deseado.

---

## Endpoints del backend utilizados

Base URL: `http://localhost:3050/api` (configurable en `.env`)

El JWT se inyecta automáticamente en el header `token` en cada petición (interceptor de Axios). Varios endpoints también requieren el header `service` para indicar la operación a ejecutar, siguiendo la arquitectura de servicios dinámicos del backend.

### Login

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| POST | `/user/login` | No | Recibe `{ email, password }`, devuelve `{ token, redirect }` |

### Productos

| Método | Endpoint | `service` header | Rol | Descripción |
|---|---|---|---|---|
| GET | `/product/query` | `all-product` | Cualquiera | Todos los productos (con categoría populada) |
| GET | `/product/query/:id` | `product-by-id` | Cualquiera | Un producto por ID |
| POST | `/product/manager` | `create-product` | Admin | Crear producto (`multipart/form-data`) |
| PUT | `/product/manager/:id` | `edit-product` | Admin | Editar producto (`multipart/form-data`) |
| DELETE | `/product/manager/:id` | `delete-product` | Admin | Eliminar producto (soft delete: `isDeleted: true`) |

### Usuarios

| Método | Endpoint | `service` header | Rol | Descripción |
|---|---|---|---|---|
| GET | `/user/query` | `all-user-users` | Admin | Todos los usuarios con rol "Usuario" |
| GET | `/user/query` | `all-admin-users` | Admin | Todos los usuarios con rol "Administrador" |
| POST | `/user/manager` | `create-user` | Admin | Crear usuario nuevo |
| PUT | `/user/manager` | `edit-user` | Admin | Editar datos de un usuario |

### Categorías

| Método | Endpoint | `service` header | Rol | Descripción |
|---|---|---|---|---|
| GET | `/category/query` | `all-categories` | Cualquiera | Todas las categorías (para filtros y formularios) |

---

## Funcionalidades implementadas

### Autenticación y sesión
- Formulario de login con validación en el cliente (formato de email, longitud mínima)
- Token JWT almacenado en `localStorage` — la sesión persiste al recargar la página
- Al iniciar la app, el token guardado se valida verificando su fecha de expiración antes de usarlo
- Guard de rutas: cualquier pantalla privada redirige automáticamente al login si no hay sesión activa
- Logout que limpia el estado en memoria y el `localStorage`
- Interceptor global: respuestas 401 cierran la sesión; 403 muestran "sin permiso"; 500 muestran "error del servidor"

### Catálogo de productos
- Grid responsivo que se adapta de 1 a 4 columnas según el tamaño de pantalla
- Filtro por texto (nombre y descripción)
- Filtro por categoría (desplegable con las categorías del backend)
- Filtro por estado activo / inactivo (basado en `isDeleted`)
- Filtro por rango de precio con campos de mínimo y máximo
- Todos los filtros se combinan en un único `$derived()` sin llamadas adicionales a la API
- Al cambiar cualquier filtro, la paginación vuelve automáticamente a la página 1 (`$effect`)
- Paginación client-side de 12 productos por página con navegación numérica compacta
- Skeletons de carga animados mientras se obtienen los datos
- Estado vacío con opción de limpiar filtros

### Detalle de producto
- Imagen a tamaño completo con proporción 3:4
- Badge de estado activo / inactivo
- Precio, descripción y stock
- Botón de edición visible solo para administradores

### Gestión de productos (solo administrador)
- Modal para crear producto nuevo con subida de imagen y preview inmediato
- Modal para editar producto existente con datos pre-cargados
- Diálogo de confirmación antes de eliminar, con nombre del producto
- Todos los botones de acción se deshabilitan y muestran spinner mientras se procesa la petición

### Perfil de usuario
- Avatar generado con las iniciales del nombre
- Nombre, apellido, correo y rol
- Badge de rol (Administrador en morado, Usuario en rosa)
- Accesos rápidos a productos y gestión de usuarios
- Botón de cierre de sesión

### Gestión de usuarios (solo administrador)
- Tabla de todos los usuarios del sistema (regulares y administradores)
- Filtro por nombre, apellido o correo
- Filtro por rol
- Modal para crear usuario nuevo
- Modal para editar usuario existente con campos pre-cargados
- Diálogo de confirmación antes de eliminar con el nombre completo del usuario
- Skeletons de carga en la tabla

### Diseño y UX
- Design system completo con variables CSS (`--color-primary`, `--font-serif`, `--space-*`, etc.)
- Colores de marca: burgundy `#7B2D26`, rosa palo `#D8A39D`, fondo `#FAF9F8`
- Tipografías: Playfair Display (serif) para títulos y precios, Inter (sans-serif) para texto
- Diseño completamente responsivo con breakpoints en 640px y 768px
- Navbar fija con menú hamburguesa en móvil
- Animaciones de entrada en modales (`fadeUp`)
- Toasts de éxito, error, advertencia e información con auto-cierre

---

## Instalación y ejecución

### Requisitos previos

- Node.js 18 o superior
- El backend de Reniel Store corriendo en `http://localhost:3050`
- CORS del backend habilitado para `http://localhost:5173`

### Pasos

```bash
# 1. Entrar a la carpeta
cd Frontend-Svelte

# 2. Instalar dependencias
npm install

# 3. Asegurarse de que el .env tiene la URL del backend
# (ya está creado, pero se puede modificar)
cat .env
# VITE_API_BASE=http://localhost:3050/api

# 4. Iniciar en modo desarrollo
npm run dev
# → http://localhost:5173

# 5. Compilar para producción
npm run build
# → archivos en dist/

# 6. Preview del build de producción
npm run preview
# → http://localhost:4173
```

### Credenciales de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@gmail.com | 123456 |
| Usuario | user@gmail.com | 123456 |

---

## Variables de entorno

| Variable | Ejemplo | Descripción |
|---|---|---|
| `VITE_API_BASE` | `http://localhost:3050/api` | URL base de la API REST del backend |

> En Vite, las variables expuestas al navegador deben comenzar con `VITE_`. Si se cambia esta variable, es necesario reiniciar el servidor de desarrollo.

---

## Decisiones técnicas

### Router SPA con hash routing

Se usa `window.location.hash` para la navegación (URLs del tipo `http://localhost:5173/#/products`). No requiere configuración del servidor web y funciona en cualquier hosting estático sin redirects. El router es un módulo `.svelte.js` con `$state()` que escucha el evento `hashchange` del navegador.

Los guards de ruta viven en `App.svelte` dentro de un `$effect()`. Esto es limpio y declarativo: el efecto se re-ejecuta cuando cambia `auth.isAuthenticated` o `router.currentPage`, decidiendo si redirigir.

### CSS puro con design tokens

En lugar de Material-UI o Tailwind, el diseño se construye sobre variables CSS definidas en `:root`. Esto mantiene exactamente los mismos colores y tipografías del frontend React original, sin añadir dependencias de JavaScript al bundle. Las clases de utilidad (`.btn`, `.card`, `.badge`, `.input`, `.grid-products`) son reutilizables en cualquier componente.

### Stores como módulos `.svelte.js`

Los stores globales (`auth`, `router`, `toast`) son módulos con estado en el ámbito del archivo. Al importar el store, todos los componentes comparten la misma instancia reactiva. No se necesita Context API ni `getContext/setContext`.

### Interceptores de Axios centralizados

El interceptor de requests inyecta el header `token` automáticamente desde el store de auth. El interceptor de responses maneja todos los errores HTTP de forma centralizada (401 cierra sesión, 403 y 500 muestran toasts). Esto elimina la necesidad de repetir lógica de manejo de errores en cada servicio o componente.

### `untrack()` para inicialización de formularios

Svelte 5 emite un warning cuando se usa un prop reactivo para inicializar un `$state()`, porque normalmente indica un bug (el estado no se actualizaría si el prop cambia). En este proyecto, los formularios de edición están dentro de `{#if showForm}`, por lo que el componente se destruye y recrea completamente cada vez que se abre. Usar `untrack()` es la forma idiomática de Svelte 5 para indicar explícitamente "quiero el valor inicial, no una suscripción reactiva".
