<script>
  import { userService } from '../lib/services/user.service.js'
  import { toastStore } from '../lib/stores/toast.svelte.js'

  import { untrack } from 'svelte'

  let { user = null, onSave = () => {}, onClose = () => {} } = $props()

  let isEdit = $derived(!!user)

  let user_name     = $state(untrack(() => user?.user_name     ?? ''))
  let user_lastname = $state(untrack(() => user?.user_lastname ?? ''))
  let email         = $state(untrack(() => user?.email         ?? ''))
  let password      = $state('')
  let rol           = $state(untrack(() => user?.rol_id?.rol   ?? 'Usuario'))

  let form = {
    get user_name()     { return user_name },     set user_name(v)     { user_name = v },
    get user_lastname() { return user_lastname },  set user_lastname(v) { user_lastname = v },
    get email()         { return email },          set email(v)         { email = v },
    get password()      { return password },       set password(v)      { password = v },
    get rol()           { return rol },            set rol(v)           { rol = v },
  }
  let loading = $state(false)
  let errors  = $state({})

  function validate() {
    const e = {}
    if (!form.user_name.trim())     e.user_name     = 'El nombre es obligatorio'
    if (!form.user_lastname.trim()) e.user_lastname = 'El apellido es obligatorio'
    if (!form.email.trim())         e.email         = 'El correo es obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Correo inválido'
    if (!isEdit && !form.password)  e.password      = 'La contraseña es obligatoria'
    if (!isEdit && form.password && form.password.length < 6) e.password = 'Mínimo 6 caracteres'
    errors = e
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate() || loading) return
    loading = true
    try {
      const payload = { ...form }
      if (isEdit && !payload.password) delete payload.password
      if (isEdit) {
        await userService.update({ ...payload, id: user._id })
        toastStore.success('Usuario actualizado')
      } else {
        await userService.create(payload)
        toastStore.success('Usuario creado')
      }
      onSave()
    } catch (err) {
      toastStore.error(err.response?.data?.message ?? 'Error al guardar')
    } finally {
      loading = false
    }
  }
</script>

<div
  class="overlay"
  role="dialog"
  tabindex="-1"
  aria-modal="true"
  aria-label={isEdit ? 'Editar usuario' : 'Nuevo usuario'}
  onkeydown={e => e.key === 'Escape' && onClose()}
>
  <button class="backdrop" onclick={onClose} aria-label="Cerrar modal" tabindex="-1"></button>
  <div class="modal card">

    <div class="modal-header">
      <h2 class="modal-title">{isEdit ? 'Editar usuario' : 'Nuevo usuario'}</h2>
      <button class="btn btn-ghost btn-icon" onclick={onClose} aria-label="Cerrar">✕</button>
    </div>

    <form onsubmit={handleSubmit} novalidate class="modal-body">
      <div class="fields">
        <div class="two-cols">
          <div class="field">
            <label class="label" for="uf-name">Nombre</label>
            <input id="uf-name" class="input" class:error={errors.user_name}
              bind:value={form.user_name} placeholder="Nombre" disabled={loading} />
            {#if errors.user_name}<span class="field-error">{errors.user_name}</span>{/if}
          </div>
          <div class="field">
            <label class="label" for="uf-last">Apellido</label>
            <input id="uf-last" class="input" class:error={errors.user_lastname}
              bind:value={form.user_lastname} placeholder="Apellido" disabled={loading} />
            {#if errors.user_lastname}<span class="field-error">{errors.user_lastname}</span>{/if}
          </div>
        </div>

        <div class="field">
          <label class="label" for="uf-email">Correo</label>
          <input id="uf-email" type="email" class="input" class:error={errors.email}
            bind:value={form.email} placeholder="correo@ejemplo.com" disabled={loading} />
          {#if errors.email}<span class="field-error">{errors.email}</span>{/if}
        </div>

        <div class="field">
          <label class="label" for="uf-pass">
            Contraseña{isEdit ? ' (dejar vacío para no cambiar)' : ''}
          </label>
          <input id="uf-pass" type="password" class="input" class:error={errors.password}
            bind:value={form.password} placeholder="••••••••" disabled={loading} />
          {#if errors.password}<span class="field-error">{errors.password}</span>{/if}
        </div>

        <div class="field">
          <label class="label" for="uf-rol">Rol</label>
          <select id="uf-rol" class="input select" bind:value={form.rol} disabled={loading}>
            <option value="Usuario">Usuario</option>
            <option value="Administrador">Administrador</option>
          </select>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-ghost" onclick={onClose} disabled={loading}>Cancelar</button>
        <button type="submit" class="btn btn-primary" disabled={loading}>
          {#if loading}<span class="spinner"></span>Guardando…{:else}{isEdit ? 'Guardar cambios' : 'Crear usuario'}{/if}
        </button>
      </div>
    </form>
  </div>
</div>

<style>
.overlay {
  position: fixed; inset: 0;
  display: flex; align-items: center; justify-content: center;
  z-index: 300; padding: var(--space-4);
}
.backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.5);
  border: none; cursor: default; z-index: 0;
}
.modal { position: relative; z-index: 1; width: 100%; max-width: 480px; animation: fadeUp 200ms ease; }
@keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--space-6); border-bottom: 1px solid var(--color-border-light);
}
.modal-title { font-family: var(--font-serif); font-size: 1.2rem; font-weight: 600; color: var(--color-primary); }
.modal-body  { padding: var(--space-6); }
.fields      { display: flex; flex-direction: column; gap: var(--space-4); margin-bottom: var(--space-6); }
.two-cols    { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
.modal-footer { display: flex; justify-content: flex-end; gap: var(--space-3); padding-top: var(--space-4); border-top: 1px solid var(--color-border-light); }
.spinner { width:14px; height:14px; border:2px solid rgba(255,255,255,.3); border-top-color:#fff; border-radius:50%; animation:spin .7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
