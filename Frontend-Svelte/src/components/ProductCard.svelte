<script>
  import { auth } from '../lib/stores/auth.svelte.js'
  import { router } from '../lib/stores/router.svelte.js'

  // $props() con callbacks para comunicación hijo → padre
  let {
    product,
    onEdit   = () => {},
    onDelete = () => {},
  } = $props()

  // $derived — estado activo/inactivo según isDeleted
  let isActive  = $derived(!product.isDeleted)
  let priceText = $derived(`$${Number(product.price).toLocaleString('es-MX')}`)

  function viewDetail() {
    router.navigate(`/products/${product._id}`)
  }
</script>

<article class="product-card">
  <!-- Imagen -->
  <button class="img-wrap" onclick={viewDetail} tabindex="0" aria-label="Ver {product.name}">
    {#if product.image}
      <img src={product.image} alt={product.name} loading="lazy" />
    {:else}
      <div class="img-placeholder">
        <span>Sin imagen</span>
      </div>
    {/if}
    <div class="img-overlay">
      <span>Ver detalle</span>
    </div>
  </button>

  <!-- Info -->
  <div class="card-body">
    <div class="card-top">
      <span class="badge {isActive ? 'badge-active' : 'badge-inactive'}">
        {isActive ? 'Activo' : 'Inactivo'}
      </span>
      {#if product.category_id?.gender}
        <span class="category-tag">{product.category_id.gender}</span>
      {/if}
    </div>

    <button class="product-name" onclick={viewDetail}>{product.name}</button>

    {#if product.category_id?.product}
      <p class="product-category">{product.category_id.product}</p>
    {/if}

    <div class="card-footer">
      <span class="price">{priceText}</span>

      {#if auth.isAdmin}
        <div class="card-actions">
          <button
            class="btn btn-ghost btn-icon"
            onclick={() => onEdit(product)}
            title="Editar"
            aria-label="Editar {product.name}"
          >
            ✎
          </button>
          <button
            class="btn btn-danger btn-icon"
            onclick={() => onDelete(product._id)}
            title="Eliminar"
            aria-label="Eliminar {product.name}"
          >
            ✕
          </button>
        </div>
      {/if}
    </div>
  </div>
</article>

<style>
.product-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: box-shadow var(--transition), transform var(--transition);
  display: flex;
  flex-direction: column;
}
.product-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* Imagen */
.img-wrap {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: var(--color-bg-alt);
  cursor: pointer;
  border: none;
  padding: 0;
  width: 100%;
}
.img-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 300ms ease;
}
.product-card:hover .img-wrap img { transform: scale(1.04); }

.img-placeholder {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-muted);
  font-size: 13px;
}

.img-overlay {
  position: absolute; inset: 0;
  background: rgba(123,45,38,.35);
  display: flex; align-items: center; justify-content: center;
  opacity: 0;
  transition: opacity var(--transition);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: .04em;
}
.img-wrap:hover .img-overlay { opacity: 1; }

/* Body */
.card-body {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex: 1;
}

.card-top {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.category-tag {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.product-name {
  background: none;
  border: none;
  padding: 0;
  font-family: var(--font-serif);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
  text-align: left;
  line-height: 1.3;
  transition: color var(--transition);
}
.product-name:hover { color: var(--color-primary); }

.product-category {
  font-size: 12px;
  color: var(--color-text-muted);
  margin: 0;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: var(--space-2);
}

.price {
  font-family: var(--font-serif);
  font-size: 17px;
  font-weight: 700;
  color: var(--color-primary);
}

.card-actions {
  display: flex;
  gap: var(--space-1);
}
.card-actions .btn-icon {
  font-size: 15px;
  width: 32px; height: 32px;
}
</style>
