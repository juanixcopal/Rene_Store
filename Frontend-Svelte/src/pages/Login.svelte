<script>
  import { auth } from '../lib/stores/auth.svelte.js'
  import { router } from '../lib/stores/router.svelte.js'
  import { authService } from '../lib/services/auth.service.js'
  import { toastStore } from '../lib/stores/toast.svelte.js'

  let email    = $state('')
  let password = $state('')
  let loading  = $state(false)
  let errors   = $state({})

  function validate() {
    const e = {}
    if (!email.trim())    e.email    = 'El correo es obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Correo inválido'
    if (!password)        e.password = 'La contraseña es obligatoria'
    else if (password.length < 6) e.password = 'Mínimo 6 caracteres'
    errors = e
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate() || loading) return
    loading = true
    try {
      const res = await authService.login(email, password)
      auth.login(res.token)
      router.navigate('/products')
    } catch (err) {
      const msg = err.response?.data?.message ?? 'Credenciales incorrectas'
      toastStore.error(msg)
    } finally {
      loading = false
    }
  }
</script>

<div class="login-root">
  <!-- Panel izquierdo — branding -->
  <div class="brand-panel" aria-hidden="true">
    <div class="brand-content">
      <div class="brand-logo">R</div>
      <h1 class="brand-name">Reniel Store</h1>
      <p class="brand-tagline">Moda que define tu estilo</p>
      <div class="brand-divider"></div>
      <p class="brand-sub">Gestiona tu tienda con elegancia</p>
    </div>
    <div class="brand-pattern"></div>
  </div>

  <!-- Panel derecho — formulario -->
  <div class="form-panel">
    <div class="form-box">
      <div class="form-header">
        <span class="section-label">Bienvenido</span>
        <h2 class="form-title">Iniciar sesión</h2>
        <p class="form-subtitle">Accede a tu cuenta para continuar</p>
      </div>

      <form onsubmit={handleSubmit} novalidate>
        <div class="fields">
          <div class="field">
            <label class="label" for="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              class="input"
              class:error={errors.email}
              bind:value={email}
              placeholder="nombre@correo.com"
              autocomplete="email"
              disabled={loading}
            />
            {#if errors.email}
              <span class="field-error">{errors.email}</span>
            {/if}
          </div>

          <div class="field">
            <label class="label" for="password">Contraseña</label>
            <input
              id="password"
              type="password"
              class="input"
              class:error={errors.password}
              bind:value={password}
              placeholder="••••••••"
              autocomplete="current-password"
              disabled={loading}
            />
            {#if errors.password}
              <span class="field-error">{errors.password}</span>
            {/if}
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-lg w-full submit-btn"
          disabled={loading}
        >
          {#if loading}
            <span class="spinner"></span>
            Verificando...
          {:else}
            Entrar
          {/if}
        </button>
      </form>
    </div>
  </div>
</div>

<style>
.login-root {
  display: flex;
  min-height: 100vh;
}

/* Brand panel */
.brand-panel {
  flex: 1;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.brand-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
  padding: var(--space-8);
}
.brand-logo {
  width: 72px; height: 72px;
  border-radius: var(--radius-xl);
  background: rgba(255,255,255,.15);
  border: 2px solid rgba(255,255,255,.3);
  font-family: var(--font-serif);
  font-size: 36px;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto var(--space-6);
}
.brand-name {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-2);
}
.brand-tagline {
  font-size: 16px;
  font-weight: 300;
  opacity: .85;
  letter-spacing: 0.04em;
}
.brand-divider {
  width: 40px; height: 2px;
  background: rgba(255,255,255,.4);
  margin: var(--space-5) auto;
}
.brand-sub { font-size: 14px; opacity: .65; }

/* Decorative pattern */
.brand-pattern {
  position: absolute; inset: 0;
  background-image:
    radial-gradient(circle at 20% 80%, rgba(255,255,255,.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255,255,255,.07) 0%, transparent 50%);
}

/* Form panel */
.form-panel {
  width: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  padding: var(--space-8) var(--space-6);
}
.form-box {
  width: 100%;
  max-width: 380px;
}
.form-header { margin-bottom: var(--space-8); }
.form-title {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-top: var(--space-2);
  margin-bottom: var(--space-2);
}
.form-subtitle { font-size: 14px; color: var(--color-text-muted); }

.fields { display: flex; flex-direction: column; gap: var(--space-5); margin-bottom: var(--space-6); }

.submit-btn { margin-top: var(--space-2); }

.spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin .7s linear infinite;
  flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Responsive */
@media (max-width: 768px) {
  .brand-panel { display: none; }
  .form-panel  { width: 100%; padding: var(--space-8) var(--space-5); }
}
</style>
