# Rene Store – Backend Python (Práctica 2)

Backend REST desarrollado con **FastAPI**, **SQLAlchemy** y **SQLite** como sustituto del backend Node.js original. Compatible con el frontend Svelte 5 de la Práctica 1 sin modificaciones.

## Tecnologías

| Herramienta | Uso |
|---|---|
| **FastAPI** | Framework HTTP |
| **SQLite + SQLAlchemy** | Base de datos y ORM |
| **Pydantic v2** | Validación de datos (422 automático) |
| **python-jose** | Generación/validación de JWT |
| **bcrypt** | Hash de contraseñas |
| **uvicorn** | Servidor ASGI |

## Estructura del proyecto

```
Backend-Python/
├── main.py                         # Punto de entrada
├── requirements.txt
├── .env
├── static/uploads/                 # Imágenes subidas
└── app/
    ├── core/
    │   ├── config.py               # Variables de entorno
    │   ├── security.py             # JWT + bcrypt
    │   ├── dependencies.py         # Guards de autenticación (FastAPI Depends)
    │   └── exceptions.py           # Excepciones de negocio + manejador global
    ├── database/
    │   ├── connection.py           # Engine SQLAlchemy + get_db
    │   └── seed.py                 # Datos iniciales
    ├── models/                     # Modelos ORM (tablas)
    │   ├── role_model.py
    │   ├── user_model.py
    │   ├── category_model.py
    │   └── product_model.py
    ├── schemas/                    # Esquemas Pydantic (validación de inputs)
    │   ├── auth_schema.py
    │   ├── user_schema.py
    │   ├── category_schema.py
    │   └── product_schema.py
    ├── repositories/               # Capa de acceso a datos (patrón repositorio)
    │   ├── user_repository.py
    │   ├── category_repository.py
    │   └── product_repository.py
    ├── services/                   # Lógica de negocio
    │   ├── user_service.py
    │   ├── category_service.py
    │   └── product_service.py
    ├── routers/                    # Controladores HTTP
    │   ├── user_router.py
    │   ├── category_router.py
    │   └── product_router.py
    └── helpers.py                  # Serialización de respuestas JSON
```

## Instalación y ejecución

### Requisitos

- Python 3.12+

### 1. Instalar dependencias

```bash
cd Backend-Python
pip install -r requirements.txt
```

### 2. Configurar variables de entorno (opcional)

El archivo `.env` ya tiene valores por defecto listos para desarrollo:

```env
JWT_SECRET=rene_store_python_secret_2024
JWT_EXPIRE_HOURS=6
DATABASE_URL=sqlite:///./rene_store.db
UPLOAD_DIR=static/uploads
SERVER_URL=http://localhost:3050
```

### 3. Ejecutar el servidor

```bash
# Desde la carpeta Backend-Python/
python -m uvicorn main:app --host 0.0.0.0 --port 3050 --reload
```

El servidor arranca en **http://localhost:3050**

- API docs interactiva: http://localhost:3050/docs
- API docs alternativa: http://localhost:3050/redoc

> La base de datos SQLite y los datos de ejemplo se crean automáticamente al primer arranque.

## Endpoints principales

### Autenticación

| Método | URL | Descripción |
|---|---|---|
| POST | `/api/user/login` | Login, retorna JWT |
| POST | `/api/user/register` | Registro de usuario |

### Productos (requiere JWT)

| Método | URL | Header `service` | Rol |
|---|---|---|---|
| GET | `/api/product/query` | `all-product` | Cualquiera |
| GET | `/api/product/query/{id}` | `product-by-id` | Cualquiera |
| GET | `/api/product/query/{gender}/{category_id}` | `product-by-gender-category` | Cualquiera |
| POST | `/api/product/manager` | `create-product` | Administrador |
| PUT | `/api/product/manager/{id}` | `edit-product` | Administrador |
| DELETE | `/api/product/manager/{id}` | `delete-product` | Administrador |

### Usuarios (requiere JWT + rol Administrador)

| Método | URL | Header `service` | Descripción |
|---|---|---|---|
| GET | `/api/user/query` | `all-user-users` | Listar usuarios |
| GET | `/api/user/query` | `all-admin-users` | Listar admins |
| POST | `/api/user/manager` | `create-user` | Crear usuario |
| PUT | `/api/user/manager` | `edit-user` | Editar usuario |

### Categorías (requiere JWT)

| Método | URL | Header `service` |
|---|---|---|
| GET | `/api/category/query` | `all-categories` |

## Usuarios por defecto

| Email | Contraseña | Rol |
|---|---|---|
| admin@gmail.com | 123456 | Administrador |
| user@gmail.com | 123456 | Usuario |
| juan.ixcopal@gmail.com | 123456 | Administrador |
| usuario1@gmail.com | 123456 | Usuario |

## Conexión con el frontend Svelte 5

El frontend ya apunta a `http://localhost:3050/api` (`.env` del frontend no requiere cambios). Solo asegúrate de que este backend esté corriendo en lugar del backend Node.js.
