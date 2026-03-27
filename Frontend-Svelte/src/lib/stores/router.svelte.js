// Router SPA — hash-based, sin SvelteKit
// Rutas: #/login  #/products  #/products/:id  #/profile  #/users

function createRouter() {
  let path  = $state(getHash())
  let params = $state({})

  function getHash() {
    return window.location.hash.slice(1) || '/products'
  }

  function parsePath(raw) {
    // Extrae segmentos y params de rutas con :id
    const segments = raw.split('/').filter(Boolean)
    return segments
  }

  function navigate(to) {
    window.location.hash = to
  }

  // Escuchar cambios de hash
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', () => {
      path = getHash()
    })
  }

  return {
    get path()   { return path   },
    get params() { return params },

    navigate,

    // Helpers de matching
    is(route)          { return path === route },
    startsWith(prefix) { return path.startsWith(prefix) },

    // Extraer :id de rutas como /products/abc123
    get productId() {
      const match = path.match(/^\/products\/([^/]+)$/)
      return match ? match[1] : null
    },

    get currentPage() {
      if (path === '/login')            return 'login'
      if (path === '/products')         return 'products'
      if (path.startsWith('/products/')) return 'product-detail'
      if (path === '/profile')          return 'profile'
      if (path === '/users')            return 'users'
      return 'not-found'
    },
  }
}

export const router = createRouter()
