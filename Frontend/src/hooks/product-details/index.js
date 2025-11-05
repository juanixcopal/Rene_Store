import { useState } from 'react'
import { useFetchProductDetails } from './fetch-data'
import { useActions } from './actions.js'

export const useFetchInitProductDetails = () => {
  const [idProduct, setIdProduct] = useState()

  const handleChangeIdProduct = id => {
    setIdProduct(id)
  }

  const fetchProductDetails = useFetchProductDetails({ idProduct })

  const actions = useActions({
    idProduct
  })

  return {
    handleChangeIdProduct,
    fetchProductDetails,
    actions
  }
}
