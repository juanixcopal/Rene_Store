<script>
  import { router } from '../lib/stores/router.svelte.js'
</script>

<div class="page">
  <div class="container">
    <div class="nf-center">
      <div class="nf-code font-serif">404</div>
      <h1 class="nf-title">Página no encontrada</h1>
      <p class="nf-sub">La página que buscas no existe o no tienes acceso.</p>
      <button class="btn btn-primary" onclick={() => router.navigate('/products')}>
        Ir a Productos
      </button>
    </div>
  </div>
</div>

<style>
.nf-center {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  min-height: 60vh; gap: var(--space-4); text-align: center;
}
.nf-code {
  font-size: 7rem; font-weight: 700;
  color: var(--color-secondary); line-height: 1;
}
.nf-title { font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-text); }
.nf-sub   { color: var(--color-text-muted); font-size: 15px; max-width: 300px; }
</style>
