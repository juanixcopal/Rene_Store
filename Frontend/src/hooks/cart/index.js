import { useFetchProductsInCart } from './fetch-data.js'

export const useFetchInitCart = () => {
  const fetchProductsInCart = useFetchProductsInCart()

  return {
    fetchProductsInCart
  }
}
