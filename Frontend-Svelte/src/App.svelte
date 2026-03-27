<script>
  import { auth } from './lib/stores/auth.svelte.js'
  import { router } from './lib/stores/router.svelte.js'
  import Navbar from './components/Navbar.svelte'
  import Toast  from './components/Toast.svelte'

  // Páginas (lazy no disponible en Svelte 5 sin SvelteKit, importamos directo)
  import Login         from './pages/Login.svelte'
  import Products      from './pages/Products.svelte'
  import ProductDetail from './pages/ProductDetail.svelte'
  import Profile       from './pages/Profile.svelte'
  import Users         from './pages/Users.svelte'
  import NotFound      from './pages/NotFound.svelte'

  // $effect — redirige al login si el usuario no está autenticado
  $effect(() => {
    if (!auth.isAuthenticated && router.currentPage !== 'login') {
      router.navigate('/login')
    }
    if (auth.isAuthenticated && router.currentPage === 'login') {
      router.navigate('/products')
    }
  })
</script>

<!-- Toast siempre visible -->
<Toast />

{#if router.currentPage === 'login'}
  <Login />
{:else if auth.isAuthenticated}
  <Navbar />
  <main>
    {#if router.currentPage === 'products'}
      <Products />
    {:else if router.currentPage === 'product-detail'}
      <ProductDetail id={router.productId} />
    {:else if router.currentPage === 'profile'}
      <Profile />
    {:else if router.currentPage === 'users' && auth.isAdmin}
      <Users />
    {:else}
      <NotFound />
    {/if}
  </main>
{/if}

<style>
main {
  padding-top: var(--navbar-h);
  min-height: 100vh;
}
@media (max-width: 768px) {
  main { padding-top: 0; }
}
</style>
