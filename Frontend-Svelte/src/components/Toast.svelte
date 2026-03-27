<script>
  import { toastStore } from '../lib/stores/toast.svelte.js'
</script>

<div class="toast-container" aria-live="polite">
  {#each toastStore.list as toast (toast.id)}
    <div class="toast toast-{toast.type}" role="alert">
      <span class="toast-icon">
        {#if toast.type === 'success'}✓
        {:else if toast.type === 'error'}✕
        {:else if toast.type === 'warning'}⚠
        {:else}ℹ{/if}
      </span>
      <span class="toast-msg">{toast.message}</span>
      <button class="toast-close" onclick={() => toastStore.dismiss(toast.id)} aria-label="Cerrar">✕</button>
    </div>
  {/each}
</div>

<style>
.toast-container {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 12px var(--space-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  border: 1px solid transparent;
  font-size: 14px;
  font-weight: 500;
  min-width: 280px;
  max-width: 380px;
  pointer-events: all;
  animation: slideIn 200ms ease;
}

@keyframes slideIn {
  from { transform: translateX(20px); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}

.toast-success { background: var(--color-success-bg); color: var(--color-success); border-color: #7B9B82; }
.toast-error   { background: var(--color-error-bg);   color: var(--color-primary-dark); border-color: #C89692; }
.toast-warning { background: var(--color-warning-bg); color: var(--color-warning);    border-color: #D4A574; }
.toast-info    { background: var(--color-bg-alt);     color: var(--color-text);       border-color: var(--color-border); }

.toast-icon { font-size: 15px; flex-shrink: 0; }
.toast-msg  { flex: 1; line-height: 1.4; }
.toast-close {
  background: none; border: none;
  font-size: 13px; cursor: pointer;
  opacity: .6; flex-shrink: 0;
  padding: 2px 4px;
  color: inherit;
}
.toast-close:hover { opacity: 1; }

@media (max-width: 640px) {
  .toast-container { bottom: var(--space-4); right: var(--space-4); left: var(--space-4); }
  .toast { min-width: unset; max-width: 100%; }
}
</style>
