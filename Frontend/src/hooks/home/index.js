import { useFetch5ManProducts, useFetch5WomanProducts } from './fetch-data.js'

export const useFetchInitHome = () => {
  const fetch5ManProducts = useFetch5ManProducts()
  const fetch5WomanProducts = useFetch5WomanProducts()

  return {
    fetch5ManProducts,
    fetch5WomanProducts
  }
}
