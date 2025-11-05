import { useState } from 'react'
import { useFetchProductDetails } from './fetch-data'

export const useFetchInitProductDetails = () => {
  const [idProduct, setIdProduct] = useState()

  const handleChangeIdProduct = id => {
    setIdProduct(id)
  }

  const fetchProductDetails = useFetchProductDetails({ idProduct })

  return {
    handleChangeIdProduct,
    fetchProductDetails
  }
}
