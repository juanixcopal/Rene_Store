import { useEffect, useState } from 'react'
import { getProductsInCart } from '../../data/cart/get.js'
import ExecutionPermit from '../../helpers/execution-permit-helper.js'

export const useFetchProductsInCart = () => {
  const [productsInCart, setProductsInCart] = useState([])

  const _getProductsInCart = async () => {
    console.log('HACE _getProductsInCart')

    try {
      await getProductsInCart()
        .then(({ data }) => {
          setProductsInCart(data)
        })
        .catch(({ response }) => {
          ExecutionPermit({ response })
        })
    } catch (error) {
      console.log('Error en _getProductsInCart', error)
    }
  }

  useEffect(() => {
    _getProductsInCart()
  }, [])

  return { productsInCart, _getProductsInCart }
}
