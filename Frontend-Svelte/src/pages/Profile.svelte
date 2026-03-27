<script>
  import { auth } from '../lib/stores/auth.svelte.js'
  import { router } from '../lib/stores/router.svelte.js'

  let displayName = $derived(`${auth.user?.user_name ?? ''} ${auth.user?.user_lastname ?? ''}`.trim())
  let initials    = $derived(
    auth.user
      ? `${auth.user.user_name?.[0] ?? ''}${auth.user.user_lastname?.[0] ?? ''}`.toUpperCase()
      : '?'
  )

  function handleLogout() {
    auth.logout()
    router.navigate('/login')
  }
</script>

<div class="page">
  <div class="container">
    <h1 class="page-title">Mi perfil</h1>

    <div class="profile-grid">
      <!-- Card principal -->
      <div class="card profile-card">
        <div class="avatar-wrap">
          <div class="avatar">{initials}</div>
        </div>
        <div class="profile-name font-serif">{displayName}</div>
        <div class="profile-email">{auth.user?.email}</div>
        <span class="badge {auth.isAdmin ? 'badge-admin' : 'badge-user'}">
          {auth.user?.rol}
        </span>

        <hr class="divider" />

        <div class="info-grid">
          <div class="info-item">
            <span class="section-label">Nombre</span>
            <span class="info-value">{auth.user?.user_name}</span>
          </div>
          <div class="info-item">
            <span class="section-label">Apellido</span>
            <span class="info-value">{auth.user?.user_lastname}</span>
          </div>
          <div class="info-item">
            <span class="section-label">Correo</span>
            <span class="info-value">{auth.user?.email}</span>
          </div>
          <div class="info-item">
            <span class="section-label">Rol</span>
            <span class="info-value">{auth.user?.rol}</span>
          </div>
        </div>

        <button class="btn btn-danger w-full logout-btn" onclick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      <!-- Accesos rápidos -->
      <div class="quick-actions">
        <h2 class="qa-title font-serif">Accesos rápidos</h2>
        <div class="qa-list">
          <button class="qa-item card" onclick={() => router.navigate('/products')}>
            <span class="qa-icon">🛍</span>
            <div>
              <div class="qa-label">Productos</div>
              <div class="qa-sub">Ver catálogo completo</div>
            </div>
          </button>
          {#if auth.isAdmin}
            <button class="qa-item card" onclick={() => router.navigate('/users')}>
              <span class="qa-icon">👥</span>
              <div>
                <div class="qa-label">Usuarios</div>
                <div class="qa-sub">Gestionar cuentas</div>
              </div>
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.profile-grid {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: var(--space-8);
  align-items: start;
  margin-top: var(--space-8);
}

.profile-card {
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-3);
}

.avatar-wrap { margin-bottom: var(--space-2); }
.avatar {
  width: 80px; height: 80px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  box-shadow: var(--shadow-md);
}

.profile-name  { font-size: 1.2rem; font-weight: 600; color: var(--color-text); }
.profile-email { font-size: 13px; color: var(--color-text-muted); }

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  width: 100%;
  text-align: left;
  margin: var(--space-2) 0;
}
.info-item { display: flex; flex-direction: column; gap: 3px; }
.info-value { font-size: 14px; font-weight: 500; color: var(--color-text); }

.logout-btn { margin-top: var(--space-2); }

/* Quick actions */
.qa-title   { font-size: 1.1rem; font-weight: 600; color: var(--color-text); margin-bottom: var(--space-5); }
.qa-list    { display: flex; flex-direction: column; gap: var(--space-4); }
.qa-item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-5);
  cursor: pointer;
  border: none;
  background: var(--color-surface);
  text-align: left;
  transition: box-shadow var(--transition), transform var(--transition);
}
.qa-item:hover { box-shadow: var(--shadow-md); transform: translateY(-1px); }
.qa-icon  { font-size: 1.8rem; flex-shrink: 0; }
.qa-label { font-weight: 600; font-size: 15px; color: var(--color-text); }
.qa-sub   { font-size: 13px; color: var(--color-text-muted); margin-top: 2px; }

@media (max-width: 768px) {
  .profile-grid { grid-template-columns: 1fr; }
  .info-grid    { grid-template-columns: 1fr; }
}
</style>
