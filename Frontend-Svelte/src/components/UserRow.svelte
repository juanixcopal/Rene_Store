<script>
  // $props() con callbacks onEdit y onDelete
  let { user, onEdit = () => {}, onDelete = () => {} } = $props()

  let initials   = $derived(`${user.user_name?.[0] ?? ''}${user.user_lastname?.[0] ?? ''}`.toUpperCase())
  let fullName   = $derived(`${user.user_name} ${user.user_lastname}`)
  let rol        = $derived(user.rol_id?.rol ?? 'Sin rol')
  let isAdmin    = $derived(rol === 'Administrador')
</script>

<tr>
  <td>
    <div class="user-cell">
      <div class="mini-avatar" class:is-admin={isAdmin}>{initials}</div>
      <span class="user-full">{fullName}</span>
    </div>
  </td>
  <td class="email-cell">{user.email}</td>
  <td>
    <span class="badge {isAdmin ? 'badge-admin' : 'badge-user'}">{rol}</span>
  </td>
  <td>
    <div class="row-actions">
      <button class="btn btn-ghost btn-sm" onclick={() => onEdit(user)}>Editar</button>
      <button class="btn btn-danger btn-sm" onclick={() => onDelete(user)}>Eliminar</button>
    </div>
  </td>
</tr>

<style>
.user-cell {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.mini-avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: var(--color-secondary-light);
  color: var(--color-primary);
  font-size: 12px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.mini-avatar.is-admin {
  background: #EDE9FE;
  color: #5B21B6;
}
.user-full  { font-weight: 500; font-size: 14px; }
.email-cell  { color: var(--color-text-muted); font-size: 13px; }
.row-actions { display: flex; gap: var(--space-2); }
</style>
