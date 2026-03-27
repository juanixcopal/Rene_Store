<script>
  import { auth } from '../lib/stores/auth.svelte.js'
  import { router } from '../lib/stores/router.svelte.js'

  // $props() — el padre puede pasar callbacks si los necesita
  let { onLogout = () => {} } = $props()

  // $derived — nombre del usuario reactivo
  let displayName = $derived(
    auth.user ? `${auth.user.user_name} ${auth.user.user_lastname}` : ''
  )

  let menuOpen = $state(false)

  function handleLogout() {
    auth.logout()
    router.navigate('/login')
    onLogout()
  }

  function nav(to) {
    router.navigate(to)
    menuOpen = false
  }
</script>

<header class="navbar">
  <div class="container navbar-inner">

    <!-- Logo -->
    <button class="logo" onclick={() => nav('/products')}>
      <span class="logo-icon">R</span>
      <span class="logo-text">Reniel Store</span>
    </button>

    <!-- Nav links — desktop -->
    <nav class="nav-links" aria-label="Navegación principal">
      <button
        class="nav-link"
        class:active={router.is('/products') || router.startsWith('/products/')}
        onclick={() => nav('/products')}
      >
        Productos
      </button>

      {#if auth.isAdmin}
        <button
          class="nav-link"
          class:active={router.is('/users')}
          onclick={() => nav('/users')}
        >
          Usuarios
        </button>
      {/if}

      <button
        class="nav-link"
        class:active={router.is('/profile')}
        onclick={() => nav('/profile')}
      >
        Mi perfil
      </button>
    </nav>

    <!-- Right side -->
    <div class="nav-right">
      <span class="user-chip">
        <span class="user-avatar">{auth.user?.user_name?.[0]?.toUpperCase() ?? '?'}</span>
        <span class="user-name">{displayName}</span>
        {#if auth.isAdmin}
          <span class="badge badge-admin">Admin</span>
        {/if}
      </span>

      <button class="btn btn-ghost btn-sm" onclick={handleLogout}>
        Salir
      </button>

      <!-- Mobile hamburger -->
      <button
        class="hamburger"
        aria-label="Abrir menú"
        onclick={() => menuOpen = !menuOpen}
      >
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>

  <!-- Mobile menu -->
  {#if menuOpen}
    <div class="mobile-menu">
      <button class="mobile-link" onclick={() => nav('/products')}>Productos</button>
      {#if auth.isAdmin}
        <button class="mobile-link" onclick={() => nav('/users')}>Usuarios</button>
      {/if}
      <button class="mobile-link" onclick={() => nav('/profile')}>Mi perfil</button>
      <button class="mobile-link mobile-link--danger" onclick={handleLogout}>Cerrar sesión</button>
    </div>
  {/if}
</header>

<style>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  height: var(--navbar-h);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 1px 8px rgba(123,45,38,.06);
}

.navbar-inner {
  display: flex;
  align-items: center;
  height: 100%;
  gap: var(--space-6);
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: none;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
}
.logo-icon {
  width: 34px; height: 34px;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: #fff;
  font-family: var(--font-serif);
  font-size: 17px;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
.logo-text {
  font-family: var(--font-serif);
  font-size: 17px;
  font-weight: 600;
  color: var(--color-primary);
  letter-spacing: -0.01em;
}

/* Nav links */
.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  flex: 1;
}
.nav-link {
  background: none;
  border: none;
  padding: 7px 14px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  transition: background var(--transition), color var(--transition);
  cursor: pointer;
}
.nav-link:hover { background: var(--color-bg-alt); color: var(--color-text); }
.nav-link.active {
  background: var(--color-secondary-light);
  color: var(--color-primary);
  font-weight: 600;
}

/* Right */
.nav-right {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-left: auto;
}

.user-chip {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 5px 10px 5px 5px;
  border-radius: var(--radius-full);
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
}
.user-avatar {
  width: 26px; height: 26px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.user-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
  max-width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: var(--space-2);
  cursor: pointer;
}
.hamburger span {
  display: block;
  width: 22px; height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: transform var(--transition);
}

/* Mobile menu */
.mobile-menu {
  display: none;
  flex-direction: column;
  padding: var(--space-4);
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
  gap: var(--space-1);
}
.mobile-link {
  background: none;
  border: none;
  padding: 12px var(--space-4);
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
  transition: background var(--transition);
}
.mobile-link:hover { background: var(--color-bg-alt); }
.mobile-link--danger { color: var(--color-error); }

@media (max-width: 768px) {
  .nav-links, .user-chip, .nav-right .btn { display: none; }
  .hamburger { display: flex; }
  .mobile-menu { display: flex; }
  .navbar { height: auto; min-height: var(--navbar-h); position: static; }
}
</style>
