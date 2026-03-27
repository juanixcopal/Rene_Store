<script>
  import { productService } from '../lib/services/product.service.js'
  import { auth } from '../lib/stores/auth.svelte.js'
  import { router } from '../lib/stores/router.svelte.js'
  import { toastStore } from '../lib/stores/toast.svelte.js'
  import ProductForm from '../components/ProductForm.svelte'

  let { id } = $props()

  let product  = $state(null)
  let loading  = $state(true)
  let showEdit = $state(false)

  async function load() {
    loading = true
    try {
      product = await productService.getById(id)
    } catch {
      toastStore.error('No se pudo cargar el producto')
      router.navigate('/products')
    } finally {
      loading = false
    }
  }

  $effect(() => { if (id) load() })

  let isActive   = $derived(product ? !product.isDeleted : false)
  let priceText  = $derived(product ? `$${Number(product.price).toLocaleString('es-MX')}` : '')

  function onEditSave() { showEdit = false; load(); toastStore.success('Producto actualizado') }
</script>

<div class="page">
  <div class="container">

    <button class="btn btn-ghost btn-sm back-btn" onclick={() => router.navigate('/products')}>
      ← Volver
    </button>

    {#if loading}
      <div class="detail-skeleton">
        <div class="shimmer sk-img"></div>
        <div class="sk-info">
          {#each [60,40,80,30] as w}
            <div class="shimmer sk-line" style="width:{w}%"></div>
          {/each}
        </div>
      </div>
    {:else if product}
      <div class="detail-grid">
        <!-- Imagen -->
        <div class="detail-img-wrap">
          {#if product.image}
            <img src={product.image} alt={product.name} />
          {:else}
            <div class="no-img">Sin imagen</div>
          {/if}
        </div>

        <!-- Info -->
        <div class="detail-info">
          <div class="detail-top">
            <span class="badge {isActive ? 'badge-active' : 'badge-inactive'}">
              {isActive ? 'Activo' : 'Inactivo'}
            </span>
            {#if product.category_id?.gender}
              <span class="section-label">{product.category_id.gender}</span>
            {/if}
          </div>

          <h1 class="detail-name">{product.name}</h1>

          {#if product.category_id?.product}
            <p class="detail-category">{product.category_id.product}</p>
          {/if}

          <p class="detail-price">{priceText}</p>

          <hr class="divider" />

          <p class="detail-desc">{product.description}</p>

          <div class="detail-meta">
            <div class="meta-item">
              <span class="section-label">Stock disponible</span>
              <span class="meta-value">{product.stock} unidades</span>
            </div>
          </div>

          {#if auth.isAdmin}
            <div class="detail-actions">
              <button class="btn btn-primary" onclick={() => showEdit = true}>
                Editar producto
              </button>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>

{#if showEdit && product}
  <ProductForm
    {product}
    categories={[product.category_id]}
    onSave={onEditSave}
    onClose={() => showEdit = false}
  />
{/if}

<style>
.back-btn { margin-bottom: var(--space-6); }

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: start;
}

.detail-img-wrap {
  border-radius: var(--radius-xl);
  overflow: hidden;
  aspect-ratio: 3/4;
  background: var(--color-bg-alt);
}
.detail-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.no-img {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-muted); font-size: 14px;
}

.detail-info { padding-top: var(--space-4); }
.detail-top  { display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-5); }

.detail-name {
  font-family: var(--font-serif);
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
  margin-bottom: var(--space-2);
}

.detail-category { color: var(--color-text-muted); font-size: 14px; margin-bottom: var(--space-4); }

.detail-price {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--space-4);
}

.detail-desc { color: var(--color-text-secondary); line-height: 1.7; font-size: 15px; }

.detail-meta { margin-top: var(--space-6); }
.meta-item   { display: flex; flex-direction: column; gap: 4px; }
.meta-value  { font-weight: 600; font-size: 15px; color: var(--color-text); }

.detail-actions { margin-top: var(--space-8); display: flex; gap: var(--space-3); }

/* Skeleton */
.detail-skeleton {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
}
.sk-img  { aspect-ratio: 3/4; border-radius: var(--radius-xl); }
.sk-info { display: flex; flex-direction: column; gap: var(--space-4); padding-top: var(--space-4); }
.sk-line { height: 20px; border-radius: var(--radius-sm); }
.shimmer {
  background: linear-gradient(90deg, var(--color-bg-alt) 25%, var(--color-border-light) 50%, var(--color-bg-alt) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer { to { background-position: -200% 0; } }

@media (max-width: 768px) {
  .detail-grid, .detail-skeleton { grid-template-columns: 1fr; }
}
</style>
