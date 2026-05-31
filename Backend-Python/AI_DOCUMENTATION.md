# Memoria de Uso de Inteligencia Artificial – Práctica 2

**Herramienta utilizada:** Claude (Anthropic) – claude-sonnet-4-6  
**Proyecto:** Rene Store – Migración de backend Node.js a Python/FastAPI

---

## 1. Registro de prompts e iteraciones

### Prompt 1 – Análisis del contrato de API existente

**Objetivo:** Antes de escribir una línea de código, necesitaba entender exactamente qué endpoints y estructuras JSON consumía el frontend Svelte 5.

**Prompt inicial:**
> "Explora el frontend Svelte 5 en Frontend-Svelte/src/lib/services/ y dime exactamente qué endpoints HTTP consume: método, URL completa, headers que envía (especialmente `token` y `service`), body de request y estructura JSON de respuesta esperada."

**Resultado:** La IA devolvió un análisis detallado con todos los endpoints. Sin este paso, habría habido incompatibilidades entre el contrato JSON esperado por Svelte y lo que entregara el nuevo backend.

**Por qué fue necesario refinarlo:** El primer análisis no mencionaba explícitamente que los objetos anidados en las respuestas (como `category_id` dentro de un producto) debían incluir un campo `_id` (convención de MongoDB) en lugar del `id` estándar de SQL. Se añadió al prompt:

> "¿Cómo se usa el campo `_id` en las respuestas? ¿El frontend accede a `product.category_id._id` o a `product.category_id.id`?"

**Refinamiento obtenido:** Confirmó que el frontend espera `_id` (string), lo que llevó a crear la capa `helpers.py` con funciones que serializan los IDs enteros de SQLite como strings con el nombre `_id`.

---

### Prompt 2 – Estructura de arquitectura en capas

**Objetivo:** Definir la estructura de carpetas del proyecto antes de implementar.

**Prompt:**
> "Necesito crear un backend FastAPI con separación de responsabilidades en capas para una API de e-commerce. Tiene los recursos: Usuarios (con roles), Productos (con categorías) y Categorías. La arquitectura debe tener: routers/controllers, services, repositories y models. ¿Cómo organizo las carpetas?"

**Resultado:** La IA propuso la estructura `app/routers`, `app/services`, `app/repositories`, `app/models` que se implementó. También sugirió la capa `app/core/` para configuración, seguridad y excepciones.

**Iteración:** La IA inicialmente ponía la lógica de serialización de respuestas directamente en los routers. Se refinó:

> "La serialización de los objetos ORM a JSON con campos `_id` se repite en múltiples routers. ¿Dónde centralizo esas funciones para no repetir código?"

**Solución obtenida:** Crear `app/helpers.py` con funciones `fmt_user()`, `fmt_product()` y `fmt_category()`.

---

### Prompt 3 – Autenticación JWT compatible con el frontend Svelte

**Objetivo:** El JWT generado por Python debe ser decodificable por el frontend Svelte, que extrae campos específicos del payload.

**Prompt:**
> "El frontend Svelte decodifica el JWT manualmente (base64 del payload) y espera estos campos: `{ user_name, user_lastname, email, rol, exp }`. El token se envía en un header HTTP personalizado llamado exactamente `token` (no `Authorization: Bearer`). Genera el código Python con python-jose para crear y validar tokens con este payload, y el middleware FastAPI para leerlo del header `token`."

**Resultado:** Código funcional. La IA correctamente usó `Header(...)` de FastAPI en lugar de `OAuth2PasswordBearer`, que es el patrón estándar pero incompatible con cómo el frontend envía el token.

---

### Prompt 4 – Patrón repositorio con SQLAlchemy

**Objetivo:** Implementar el patrón repositorio correctamente para encapsular el acceso a datos.

**Prompt:**
> "Implementa el patrón repositorio para SQLAlchemy 2.0. Tengo un modelo Product con una relación many-to-one a Category. Necesito que el repositorio devuelva productos con la categoría ya cargada (eager loading) para poder serializar `product.category.product` sin errores de sesión cerrada."

**Resultado:** La IA sugirió usar `joinedload()` de SQLAlchemy en las queries del repositorio, evitando el problema de lazy loading fuera de sesión.

---

## 2. Análisis crítico – Error de la IA

### Error detectado: Incompatibilidad de dependencias (`passlib` + `bcrypt`)

**Contexto:** Para hashear contraseñas, la IA sugirió usar la combinación estándar:

```python
# Código sugerido por la IA
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)
```

Con el `requirements.txt`:
```
passlib[bcrypt]>=1.7.4
```

**Por qué era incorrecto:**

Al instalar las dependencias, pip resolvió `passlib[bcrypt]` a `passlib==1.7.4` con `bcrypt==5.0.0`. Esto generó el siguiente error en runtime:

```
(trapped) error reading bcrypt version
AttributeError: module 'bcrypt' has no attribute '__about__'
ValueError: password cannot be longer than 72 bytes
```

**Causa raíz:** La librería `passlib` no ha sido actualizada desde 2020 y su integración con `bcrypt` asume que el módulo `bcrypt` expone un atributo `__about__.__version__`, que fue eliminado en `bcrypt 4.x`. La IA recomendó una combinación de librerías que ya no es compatible con las versiones actuales, porque su conocimiento sobre incompatibilidades entre versiones específicas está desactualizado.

**Corrección manual aplicada:**

Se eliminó `passlib` y se usó `bcrypt` directamente, que es la librería subyacente. Esto elimina la capa de abstracción innecesaria:

```python
# Código corregido manualmente
import bcrypt

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt(10)).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
```

Y en `requirements.txt`:
```
bcrypt>=4.0.0   # Eliminado passlib
```

**Lección aplicada:** La IA recomienda patrones "probados" de la documentación oficial (passlib + bcrypt es el ejemplo canónico de FastAPI), pero no detecta incompatibilidades de versiones actuales. Siempre hay que verificar que las combinaciones de dependencias funcionen con las versiones más recientes disponibles en pip.

---

## 3. Reflexión general

El uso de IA fue especialmente útil para:
- **Acelerar la fase de análisis**: leer y mapear el contrato de API del frontend Svelte en minutos en lugar de horas.
- **Scaffolding de arquitectura**: generar la estructura de capas completa con imports correctos.
- **Recordar APIs de librerías**: sintaxis de SQLAlchemy `joinedload`, parámetros de FastAPI `Form(...)`, `File(...)`.

Fue menos confiable para:
- **Compatibilidad de versiones**: las recomendaciones de librerías pueden estar desactualizadas.
- **Decisiones de diseño específicas del proyecto**: el header `service` del backend Node.js es un patrón no estándar que la IA no conocía; hubo que explicarle el contexto para que generara código compatible.
