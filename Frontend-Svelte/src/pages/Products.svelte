<script>
  import { auth } from '../lib/stores/auth.svelte.js'
  import { toastStore } from '../lib/stores/toast.svelte.js'
  import { productService } from '../lib/services/product.service.js'
  import { categoryService } from '../lib/services/category.service.js'
  import ProductCard from '../components/ProductCard.svelte'
  import ProductForm from '../components/ProductForm.svelte'

  const PAGE_SIZE = 12

  // ── Estado ──────────────────────────────────────────────
  let products   = $state([])
  let categories = $state([])
  let loading    = $state(true)

  // Filtros
  let search         = $state('')
  let filterCategory = $state('')
  let filterStatus   = $state('')
  let priceMin       = $state('')
  let priceMax       = $state('')

  // Paginación
  let currentPage = $state(1)

  // Modal / acciones
  let showForm      = $state(false)
  let editProduct   = $state(null)
  let deleteId      = $state(null)
  let deleteLoading = $state(false)

  // ── Carga inicial ────────────────────────────────────────
  async function loadData() {
    loading = true
    try {
      const [prods, cats] = await Promise.all([
        productService.getAll(),
        categoryService.getAll(),
      ])
      products   = prods
      categories = cats
    } catch {
      toastStore.error('No se pudieron cargar los productos')
    } finally {
      loading = false
    }
  }

  // $effect — recarga cuando el usuario se autentica
  $effect(() => {
    if (auth.isAuthenticated) loadData()
  })

  // $effect — resetea página al cambiar cualquier filtro
  $effect(() => {
    search; filterCategory; filterStatus; priceMin; priceMax
    currentPage = 1
  })

  // ── $derived — lista filtrada completa (sin paginar) ────
  let filtered = $derived(() => {
    let list = products

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      )
    }

    if (filterCategory)
      list = list.filter(p => p.category_id?._id === filterCategory)

    if (filterStatus === 'active')   list = list.filter(p => !p.isDeleted)
    if (filterStatus === 'inactive') list = list.filter(p =>  p.isDeleted)

    const min = parseFloat(priceMin)
    const max = parseFloat(priceMax)
    if (!isNaN(min)) list = list.filter(p => p.price >= min)
    if (!isNaN(max)) list = list.filter(p => p.price <= max)

    return list
  })

  // $derived — total de páginas
  let totalPages = $derived(Math.max(1, Math.ceil(filtered().length / PAGE_SIZE)))

  // $derived — productos de la página actual
  let paginated = $derived(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filtered().slice(start, start + PAGE_SIZE)
  })

  // $derived — rango de precios del catálogo para los placeholders
  let priceRange = $derived(() => {
    if (!products.length) return { min: 0, max: 0 }
    const prices = products.map(p => p.price)
    return { min: Math.min(...prices), max: Math.max(...prices) }
  })

  let hasFilters = $derived(!!search || !!filterCategory || !!filterStatus || !!priceMin || !!priceMax)

  // ── Acciones ─────────────────────────────────────────────
  function openCreate() { editProduct = null; showForm = true }
  function openEdit(p)  { editProduct = p;    showForm = true }

  function onFormSave() {
    showForm = false
    editProduct = null
    loadData()
  }

  function askDelete(id) { deleteId = id }

  async function confirmDelete() {
    if (!deleteId) return
    deleteLoading = true
    try {
      await productService.delete(deleteId)
      toastStore.success('Producto eliminado')
      products = products.filter(p => p._id !== deleteId)
    } catch {
      toastStore.error('No se pudo eliminar el producto')
    } finally {
      deleteLoading = false
      deleteId = null
    }
  }

  function clearFilters() {
    search = ''; filterCategory = ''; filterStatus = ''
    priceMin = ''; priceMax = ''
  }

  function goPage(n) {
    currentPage = Math.max(1, Math.min(n, totalPages))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
</script>

<div class="page">
  <div class="container">

    <!-- Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Productos</h1>
        <p class="text-muted text-sm mt-4">
          {#if loading}
            Cargando...
          {:else}
            {filtered().length} resultado{filtered().length !== 1 ? 's' : ''}
            {#if totalPages > 1} · Página {currentPage} de {totalPages}{/if}
          {/if}
        </p>
      </div>
      {#if auth.isAdmin}
        <button class="btn btn-primary" onclick={openCreate}>+ Nuevo producto</button>
      {/if}
    </div>

    <!-- Filtros -->
    <div class="filters-section">
      <div class="filters-row">
        <!-- Búsqueda -->
        <div class="search-wrap">
          <span class="search-icon">⌕</span>
          <input
            class="input search-input"
            type="search"
            placeholder="Buscar por nombre o descripción…"
            bind:value={search}
          />
        </div>

        <!-- Categoría -->
        <select class="input select filter-select" bind:value={filterCategory}>
          <option value="">Todas las categorías</option>
          {#each categories as cat}
            <option value={cat._id}>{cat.product} — {cat.gender}</option>
          {/each}
        </select>

        <!-- Estado -->
        <select class="input select filter-select" bind:value={filterStatus}>
          <option value="">Todos los estados</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
        </select>
      </div>

      <!-- Fila de precio -->
      <div class="price-row">
        <span class="section-label price-label">Rango de precio</span>
        <div class="price-inputs">
          <div class="price-input-wrap">
            <span class="price-prefix">$</span>
            <input
              class="input price-input"
              type="number"
              min="0"
              placeholder={loading ? '0' : priceRange().min}
              bind:value={priceMin}
            />
          </div>
          <span class="price-sep">—</span>
          <div class="price-input-wrap">
            <span class="price-prefix">$</span>
            <input
              class="input price-input"
              type="number"
              min="0"
              placeholder={loading ? '0' : priceRange().max}
              bind:value={priceMax}
            />
          </div>
        </div>

        {#if hasFilters}
          <button class="btn btn-ghost btn-sm" onclick={clearFilters}>Limpiar filtros</button>
        {/if}
      </div>
    </div>

    <!-- Grid -->
    {#if loading}
      <div class="grid-products">
        {#each Array(PAGE_SIZE) as _}
          <div class="skeleton-card">
            <div class="skeleton-img shimmer"></div>
            <div class="skeleton-body">
              <div class="skeleton-line shimmer" style="width:60%"></div>
              <div class="skeleton-line shimmer" style="width:80%"></div>
              <div class="skeleton-line shimmer" style="width:40%"></div>
            </div>
          </div>
        {/each}
      </div>
    {:else if paginated().length === 0}
      <div class="empty-state">
        <div class="empty-icon">🛍</div>
        <p class="empty-title">No se encontraron productos</p>
        {#if hasFilters}
          <button class="btn btn-outline btn-sm" onclick={clearFilters}>Quitar filtros</button>
        {/if}
      </div>
    {:else}
      <div class="grid-products">
        {#each paginated() as product (product._id)}
          <ProductCard {product} onEdit={openEdit} onDelete={askDelete} />
        {/each}
      </div>
    {/if}

    <!-- Paginación -->
    {#if !loading && totalPages > 1}
      <div class="pagination">
        <button
          class="btn btn-ghost btn-sm page-btn"
          onclick={() => goPage(currentPage - 1)}
          disabled={currentPage === 1}
        >← Anterior</button>

        <div class="page-numbers">
          {#each Array(totalPages) as _, i}
            {@const n = i + 1}
            {#if totalPages <= 7 || Math.abs(n - currentPage) <= 2 || n === 1 || n === totalPages}
              <button
                class="page-num"
                class:active={n === currentPage}
                onclick={() => goPage(n)}
              >{n}</button>
            {:else if Math.abs(n - currentPage) === 3}
              <span class="page-ellipsis">…</span>
            {/if}
          {/each}
        </div>

        <button
          class="btn btn-ghost btn-sm page-btn"
          onclick={() => goPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >Siguiente →</button>
      </div>
    {/if}

  </div>
</div>

<!-- Modal ProductForm -->
{#if showForm}
  <ProductForm
    product={editProduct}
    {categories}
    onSave={onFormSave}
    onClose={() => { showForm = false; editProduct = null }}
  />
{/if}

<!-- Confirmación de borrado -->
{#if deleteId}
  <div
    class="overlay"
    role="dialog"
    tabindex="-1"
    aria-modal="true"
    aria-label="Confirmar eliminación"
    onkeydown={e => e.key === 'Escape' && (deleteId = null)}
  >
    <button class="backdrop" onclick={() => deleteId = null} aria-label="Cerrar" tabindex="-1"></button>
    <div class="confirm-box card">
      <h3 class="confirm-title">¿Eliminar producto?</h3>
      <p class="confirm-text">Esta acción no se puede deshacer.</p>
      <div class="confirm-actions">
        <button class="btn btn-ghost" onclick={() => deleteId = null} disabled={deleteLoading}>
          Cancelar
        </button>
        <button class="btn btn-danger" onclick={confirmDelete} disabled={deleteLoading}>
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

/* Filtros */
.filters-section { margin-bottom: var(--space-8); display: flex; flex-direction: column; gap: var(--space-3); }
.filters-row { display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap; }

.search-wrap { position: relative; flex: 1; min-width: 200px; }
.search-icon {
  position: absolute; left: 12px; top: 50%;
  transform: translateY(-50%);
  font-size: 17px; color: var(--color-text-muted); pointer-events: none;
}
.search-input  { padding-left: 38px; }
.filter-select { width: auto; min-width: 160px; flex-shrink: 0; }

/* Precio */
.price-row {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-wrap: wrap;
  padding: var(--space-4);
  background: var(--color-bg-alt);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-light);
}
.price-label { white-space: nowrap; }
.price-inputs { display: flex; align-items: center; gap: var(--space-3); }
.price-input-wrap { position: relative; }
.price-prefix {
  position: absolute; left: 10px; top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted); font-size: 13px;
  pointer-events: none;
}
.price-input { width: 110px; padding-left: 22px; }
.price-sep   { color: var(--color-text-muted); font-weight: 500; }

/* Skeletons */
.skeleton-card { border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--color-border); background: var(--color-surface); }
.skeleton-img  { aspect-ratio: 3/4; width: 100%; }
.skeleton-body { padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-3); }
.skeleton-line { height: 14px; border-radius: var(--radius-sm); }
.shimmer {
  background: linear-gradient(90deg, var(--color-bg-alt) 25%, var(--color-border-light) 50%, var(--color-bg-alt) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer { to { background-position: -200% 0; } }

/* Empty */
.empty-state {
  text-align: center; padding: var(--space-16) var(--space-6);
  display: flex; flex-direction: column; align-items: center; gap: var(--space-4);
}
.empty-icon  { font-size: 3rem; }
.empty-title { font-family: var(--font-serif); font-size: 1.1rem; color: var(--color-text-secondary); }

/* Paginación */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-10);
  flex-wrap: wrap;
}
.page-numbers { display: flex; align-items: center; gap: var(--space-1); }
.page-num {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--color-border);
  background: var(--color-surface);
  font-size: 13px; font-weight: 500;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: background var(--transition), border-color var(--transition), color var(--transition);
}
.page-num:hover    { background: var(--color-bg-alt); color: var(--color-text); border-color: var(--color-secondary); }
.page-num.active   { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
.page-ellipsis     { padding: 0 4px; color: var(--color-text-muted); }
.page-btn          { flex-shrink: 0; }

/* Overlay / confirm */
.overlay {
  position: fixed; inset: 0;
  display: flex; align-items: center; justify-content: center;
  z-index: 200; padding: var(--space-4);
}
.backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.45); border: none; cursor: default; z-index: 0; }
.confirm-box { position: relative; z-index: 1; padding: var(--space-8); max-width: 380px; width: 100%; }
.confirm-title { font-family: var(--font-serif); font-size: 1.2rem; color: var(--color-text); margin-bottom: var(--space-2); }
.confirm-text  { color: var(--color-text-muted); font-size: 14px; margin-bottom: var(--space-6); }
.confirm-actions { display: flex; gap: var(--space-3); justify-content: flex-end; }

@media (max-width: 640px) {
  .page-header { flex-direction: column; }
  .filters-row { flex-direction: column; align-items: stretch; }
  .filter-select { width: 100%; }
  .price-row { flex-direction: column; align-items: flex-start; }
}
</style>
