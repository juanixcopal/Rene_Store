<script>
  import { userService } from '../lib/services/user.service.js'
  import { toastStore } from '../lib/stores/toast.svelte.js'
  import UserRow from '../components/UserRow.svelte'
  import UserForm from '../components/UserForm.svelte'

  let users   = $state([])
  let loading = $state(true)
  let search  = $state('')
  let filterRole = $state('')

  let showForm      = $state(false)
  let editUser      = $state(null)
  let deleteUser    = $state(null)   // usuario a borrar (objeto completo para mostrar nombre)
  let deleteLoading = $state(false)

  async function loadUsers() {
    loading = true
    try {
      const [regular, admins] = await Promise.all([
        userService.getAllUsers(),
        userService.getAllAdmins(),
      ])
      users = [...(regular ?? []), ...(admins ?? [])]
    } catch {
      toastStore.error('No se pudieron cargar los usuarios')
    } finally {
      loading = false
    }
  }

  $effect(() => { loadUsers() })

  // $derived — filtros
  let filtered = $derived(() => {
    let list = users
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(u =>
        u.user_name.toLowerCase().includes(q) ||
        u.user_lastname.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      )
    }
    if (filterRole) {
      list = list.filter(u => u.rol_id?.rol === filterRole)
    }
    return list
  })

  let userCount = $derived(filtered().length)

  function openCreate()  { editUser = null; showForm = true }
  function openEdit(u)   { editUser = u;    showForm = true }
  function askDelete(u)  { deleteUser = u }

  function onFormSave() {
    showForm = false
    editUser = null
    loadUsers()
  }

  async function confirmDeleteUser() {
    if (!deleteUser) return
    deleteLoading = true
    try {
      // El backend no expone un endpoint DELETE de usuario, pero podemos
      // cambiarle el rol o marcarlo de otra manera. Por ahora solo cerramos
      // y mostramos un aviso — si el backend lo soporta, se conecta aquí.
      toastStore.warning('El backend no expone eliminación de usuarios')
    } finally {
      deleteLoading = false
      deleteUser = null
    }
  }
</script>

<div class="page">
  <div class="container">

    <div class="page-header">
      <div>
        <h1 class="page-title">Usuarios</h1>
        <p class="text-muted text-sm mt-4">
          {loading ? 'Cargando…' : `${userCount} usuario${userCount !== 1 ? 's' : ''}`}
        </p>
      </div>
      <button class="btn btn-primary" onclick={openCreate}>+ Nuevo usuario</button>
    </div>

    <!-- Filtros -->
    <div class="filters-bar">
      <div class="search-wrap">
        <span class="search-icon">⌕</span>
        <input class="input search-input" type="search"
          placeholder="Buscar por nombre o correo…"
          bind:value={search} />
      </div>

      <select class="input select filter-select" bind:value={filterRole}>
        <option value="">Todos los roles</option>
        <option value="Administrador">Administrador</option>
        <option value="Usuario">Usuario</option>
      </select>
    </div>

    <!-- Tabla -->
    {#if loading}
      <div class="skeleton-table">
        {#each Array(5) as _}
          <div class="sk-row shimmer"></div>
        {/each}
      </div>
    {:else if filtered().length === 0}
      <div class="empty-state">
        <div class="empty-icon">👤</div>
        <p class="empty-title">No se encontraron usuarios</p>
      </div>
    {:else}
      <div class="table-wrap card">
        <table class="table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {#each filtered() as user (user._id)}
              <UserRow {user} onEdit={openEdit} onDelete={askDelete} />
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>

{#if showForm}
  <UserForm
    user={editUser}
    onSave={onFormSave}
    onClose={() => { showForm = false; editUser = null }}
  />
{/if}

<!-- Confirmación de borrado de usuario -->
{#if deleteUser}
  <div
    class="overlay"
    role="dialog"
    tabindex="-1"
    aria-modal="true"
    aria-label="Confirmar eliminación de usuario"
    onkeydown={e => e.key === 'Escape' && (deleteUser = null)}
  >
    <button class="backdrop" onclick={() => deleteUser = null} aria-label="Cerrar" tabindex="-1"></button>
    <div class="confirm-box card">
      <h3 class="confirm-title">¿Eliminar usuario?</h3>
      <p class="confirm-text">
        Vas a eliminar a <strong>{deleteUser.user_name} {deleteUser.user_lastname}</strong>.
        Esta acción no se puede deshacer.
      </p>
      <div class="confirm-actions">
        <button class="btn btn-ghost" onclick={() => deleteUser = null} disabled={deleteLoading}>
          Cancelar
        </button>
        <button class="btn btn-danger" onclick={confirmDeleteUser} disabled={deleteLoading}>
          {deleteLoading ? 'Eliminando…' : 'Sí, eliminar'}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
.page-header {
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: var(--space-4);
  margin-bottom: var(--space-6);
}
.filters-bar {
  display: flex; align-items: center;
  gap: var(--space-3); flex-wrap: wrap;
  margin-bottom: var(--space-6);
}
.search-wrap { position: relative; flex: 1; min-width: 200px; }
.search-icon {
  position: absolute; left: 12px; top: 50%;
  transform: translateY(-50%);
  font-size: 17px; color: var(--color-text-muted); pointer-events: none;
}
.search-input  { padding-left: 38px; }
.filter-select { width: auto; min-width: 160px; }

.table-wrap { overflow: hidden; padding: 0; }
.table { width: 100%; border-collapse: collapse; }
.table :global(th), .table :global(td) { padding: 12px var(--space-4); text-align: left; border-bottom: 1px solid var(--color-border-light); }
.table :global(th) { background: var(--color-bg-alt); font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--color-text-muted); }
.table :global(tbody tr:last-child td) { border-bottom: none; }
.table :global(tbody tr:hover td) { background: var(--color-bg-alt); }

.skeleton-table { display: flex; flex-direction: column; gap: var(--space-2); }
.sk-row { height: 52px; border-radius: var(--radius-md); }
.shimmer {
  background: linear-gradient(90deg, var(--color-bg-alt) 25%, var(--color-border-light) 50%, var(--color-bg-alt) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer { to { background-position: -200% 0; } }

.empty-state {
  text-align: center; padding: var(--space-16);
  color: var(--color-text-muted);
  display: flex; flex-direction: column; align-items: center; gap: var(--space-4);
}
.empty-icon  { font-size: 3rem; }
.empty-title { font-family: var(--font-serif); font-size: 1.1rem; color: var(--color-text-secondary); }

/* Overlay confirm */
.overlay {
  position: fixed; inset: 0;
  display: flex; align-items: center; justify-content: center;
  z-index: 200; padding: var(--space-4);
}
.backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.45); border: none; cursor: default; z-index: 0; }
.confirm-box { position: relative; z-index: 1; padding: var(--space-8); max-width: 400px; width: 100%; }
.confirm-title { font-family: var(--font-serif); font-size: 1.2rem; color: var(--color-text); margin-bottom: var(--space-2); }
.confirm-text  { color: var(--color-text-muted); font-size: 14px; margin-bottom: var(--space-6); line-height: 1.5; }
.confirm-text strong { color: var(--color-text); font-weight: 600; }
.confirm-actions { display: flex; gap: var(--space-3); justify-content: flex-end; }

@media (max-width: 640px) {
  .page-header   { flex-direction: column; }
  .filters-bar   { flex-direction: column; align-items: stretch; }
  .filter-select { width: 100%; }
}
</style>
