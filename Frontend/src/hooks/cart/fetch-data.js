import { useEffect, useState } from 'react'
import { getProductsInCart, getCartSummary } from '../../data/cart/get.js'
import ExecutionPermit from '../../helpers/execution-permit-helper.js'

export const useFetchProductsInCart = () => {
  const [productsInCart, setProductsInCart] = useState([])

  const _getProductsInCart = async () => {
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

export const useFetchCartSummary = () => {
  const [cartSummary, setCartSummary] = useState([])

  const _getCartSummary = async () => {
    try {
      await getCartSummary()
        .then(({ data }) => {
          setCartSummary(data)
        })
        .catch(({ response }) => {
          ExecutionPermit({ response })
        })
    } catch (error) {
      console.log('Error en _getCartSummary', error)
    }
  }

  useEffect(() => {
    _getCartSummary()
  }, [])

  return { cartSummary, _getCartSummary }
}
