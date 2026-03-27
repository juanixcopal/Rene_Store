<script>
  import { untrack } from 'svelte'
  import { productService } from '../lib/services/product.service.js'
  import { toastStore } from '../lib/stores/toast.svelte.js'

  // $props() con callbacks
  let {
    product   = null,
    categories = [],
    onSave  = () => {},
    onClose = () => {},
  } = $props()

  let isEdit = $derived(!!product)

  // untrack: captura el valor inicial del prop sin crear una dependencia reactiva
  // (correcto porque el modal siempre se destruye y recrea al abrirse)
  let name        = $state(untrack(() => product?.name        ?? ''))
  let description = $state(untrack(() => product?.description ?? ''))
  let price       = $state(untrack(() => product?.price       ?? ''))
  let stock       = $state(untrack(() => product?.stock       ?? ''))
  let category_id = $state(untrack(() => product?.category_id?._id ?? ''))

  let form = {
    get name()        { return name },        set name(v)        { name = v },
    get description() { return description }, set description(v) { description = v },
    get price()       { return price },       set price(v)       { price = v },
    get stock()       { return stock },       set stock(v)       { stock = v },
    get category_id() { return category_id }, set category_id(v) { category_id = v },
  }

  let imageFile    = $state(null)
  let imagePreview = $state(untrack(() => product?.image ?? null))
  let loading  = $state(false)
  let errors   = $state({})

  function validate() {
    const e = {}
    if (!form.name.trim())        e.name        = 'El nombre es obligatorio'
    if (!form.description.trim()) e.description = 'La descripción es obligatoria'
    if (!form.price || form.price <= 0) e.price = 'El precio debe ser mayor a 0'
    if (!form.stock || form.stock < 0)  e.stock = 'El stock no puede ser negativo'
    if (!form.category_id)        e.category_id = 'Selecciona una categoría'
    if (!isEdit && !imageFile)    e.image       = 'Selecciona una imagen'
    errors = e
    return Object.keys(e).length === 0
  }

  function handleImage(e) {
    const file = e.target.files?.[0]
    if (!file) return
    imageFile = file
    imagePreview = URL.createObjectURL(file)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate() || loading) return
    loading = true
    try {
      const fd = new FormData()
      fd.append('name',        form.name)
      fd.append('description', form.description)
      fd.append('price',       form.price)
      fd.append('stock',       form.stock)
      fd.append('category_id', form.category_id)
      if (imageFile) fd.append('image', imageFile)

      if (isEdit) {
        await productService.update(product._id, fd)
        toastStore.success('Producto actualizado')
      } else {
        await productService.create(fd)
        toastStore.success('Producto creado')
      }
      onSave()
    } catch (err) {
      toastStore.error(err.response?.data?.message ?? 'Error al guardar')
    } finally {
      loading = false
    }
  }
</script>

<!-- Overlay -->
<div
  class="overlay"
  role="dialog"
  tabindex="-1"
  aria-modal="true"
  aria-label={isEdit ? 'Editar producto' : 'Nuevo producto'}
  onkeydown={e => e.key === 'Escape' && onClose()}
>
  <!-- Backdrop: botón invisible que cierra al hacer clic fuera del modal -->
  <button class="backdrop" onclick={onClose} aria-label="Cerrar modal" tabindex="-1"></button>
  <div class="modal card">

    <div class="modal-header">
      <h2 class="modal-title">{isEdit ? 'Editar producto' : 'Nuevo producto'}</h2>
      <button class="btn btn-ghost btn-icon close-btn" onclick={onClose} aria-label="Cerrar">✕</button>
    </div>

    <form onsubmit={handleSubmit} novalidate class="modal-body">
      <div class="form-grid">

        <!-- Columna imagen -->
        <div class="image-col">
          <div class="image-drop" class:has-image={imagePreview}>
            {#if imagePreview}
              <img src={imagePreview} alt="Vista previa" />
            {:else}
              <div class="image-placeholder">
                <span class="upload-icon">↑</span>
                <span>Subir imagen</span>
              </div>
            {/if}
            <input
              type="file"
              accept="image/*"
              class="file-input"
              onchange={handleImage}
              aria-label="Seleccionar imagen"
            />
          </div>
          {#if errors.image}
            <span class="field-error">{errors.image}</span>
          {/if}
        </div>

        <!-- Columna campos -->
        <div class="fields-col">
          <div class="field">
            <label class="label" for="pf-name">Nombre</label>
            <input id="pf-name" class="input" class:error={errors.name}
              bind:value={form.name} placeholder="Ej. Camisa Oxford" disabled={loading} />
            {#if errors.name}<span class="field-error">{errors.name}</span>{/if}
          </div>

          <div class="field">
            <label class="label" for="pf-desc">Descripción</label>
            <textarea id="pf-desc" class="input textarea" class:error={errors.description}
              bind:value={form.description} placeholder="Describe el producto…" rows="3" disabled={loading}></textarea>
            {#if errors.description}<span class="field-error">{errors.description}</span>{/if}
          </div>

          <div class="two-cols">
            <div class="field">
              <label class="label" for="pf-price">Precio ($)</label>
              <input id="pf-price" type="number" min="0" step="0.01" class="input" class:error={errors.price}
                bind:value={form.price} placeholder="0.00" disabled={loading} />
              {#if errors.price}<span class="field-error">{errors.price}</span>{/if}
            </div>
            <div class="field">
              <label class="label" for="pf-stock">Stock</label>
              <input id="pf-stock" type="number" min="0" class="input" class:error={errors.stock}
                bind:value={form.stock} placeholder="0" disabled={loading} />
              {#if errors.stock}<span class="field-error">{errors.stock}</span>{/if}
            </div>
          </div>

          <div class="field">
            <label class="label" for="pf-cat">Categoría</label>
            <select id="pf-cat" class="input select" class:error={errors.category_id}
              bind:value={form.category_id} disabled={loading}>
              <option value="">Seleccionar categoría</option>
              {#each categories as cat}
                <option value={cat._id}>{cat.product} — {cat.gender}</option>
              {/each}
            </select>
            {#if errors.category_id}<span class="field-error">{errors.category_id}</span>{/if}
          </div>
        </div>
      </div>

      <!-- Acciones -->
      <div class="modal-footer">
        <button type="button" class="btn btn-ghost" onclick={onClose} disabled={loading}>
          Cancelar
        </button>
        <button type="submit" class="btn btn-primary" disabled={loading}>
          {#if loading}
            <span class="spinner"></span>
            Guardando...
          {:else}
            {isEdit ? 'Guardar cambios' : 'Crear producto'}
          {/if}
        </button>
      </div>
    </form>
  </div>
</div>

<style>
.overlay {
  position: fixed; inset: 0;
  display: flex; align-items: center; justify-content: center;
  z-index: 300;
  padding: var(--space-4);
  overflow-y: auto;
}

/* Backdrop: cubre el fondo, botón accesible */
.backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.5);
  border: none; cursor: default;
  z-index: 0;
}

.modal {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 680px;
  max-height: 90vh;
  overflow-y: auto;
  animation: fadeUp 200ms ease;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-6);
  border-bottom: 1px solid var(--color-border-light);
}
.modal-title {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-primary);
}
.close-btn { font-size: 16px; }

.modal-body  { padding: var(--space-6); }

.form-grid {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: var(--space-6);
  margin-bottom: var(--space-6);
}

/* Image upload */
.image-col { display: flex; flex-direction: column; gap: var(--space-2); }
.image-drop {
  position: relative;
  aspect-ratio: 3/4;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: border-color var(--transition);
  background: var(--color-bg-alt);
}
.image-drop:hover { border-color: var(--color-primary); }
.image-drop img {
  width: 100%; height: 100%;
  object-fit: cover;
}
.image-placeholder {
  width: 100%; height: 100%;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: var(--space-2);
  color: var(--color-text-muted);
  font-size: 13px;
}
.upload-icon { font-size: 24px; }
.file-input {
  position: absolute; inset: 0;
  opacity: 0; cursor: pointer;
  width: 100%; height: 100%;
}

.fields-col { display: flex; flex-direction: column; gap: var(--space-4); }
.two-cols   { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }

.textarea { resize: vertical; min-height: 80px; }

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border-light);
}

.spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 560px) {
  .form-grid { grid-template-columns: 1fr; }
  .image-drop { aspect-ratio: 16/9; }
}
</style>
