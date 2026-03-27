// Auth store — Svelte 5 runes
// Persiste el token en localStorage para sobrevivir recargas

const TOKEN_KEY = 'reniel_token'

function parseToken(token) {
  if (!token) return null
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    // Verificar expiración
    if (payload.exp && payload.exp * 1000 < Date.now()) return null
    return payload
  } catch {
    return null
  }
}

function createAuthStore() {
  // Inicializar desde localStorage si existe un token válido
  const savedToken = localStorage.getItem(TOKEN_KEY)
  const savedUser  = parseToken(savedToken)

  let token = $state(savedUser ? savedToken : null)
  let user  = $state(savedUser)

  return {
    // Getters reactivos
    get token() { return token },
    get user()  { return user  },
    get isAuthenticated() { return !!token && !!user },
    get isAdmin() { return user?.rol === 'Administrador' },

    // Acciones
    login(newToken) {
      const parsed = parseToken(newToken)
      if (!parsed) throw new Error('Token inválido')
      token = newToken
      user  = parsed
      localStorage.setItem(TOKEN_KEY, newToken)
    },

    logout() {
      token = null
      user  = null
      localStorage.removeItem(TOKEN_KEY)
    },
  }
}

export const auth = createAuthStore()
