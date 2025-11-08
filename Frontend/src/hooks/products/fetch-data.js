import { useEffect, useState } from 'react'
import { getAllProducts, getAllCategories } from '../../data/products/get.js'
import ExecutionPermit from '../../helpers/execution-permit-helper.js'

export const useFechtAllProducts = () => {
  const [allProducts, setAllProducts] = useState([])

  const _getAllProducts = async () => {
    try {
      await getAllProducts()
        .then(({ data }) => {
          setAllProducts(data)
        })
        .catch(({ response }) => {
          ExecutionPermit({ response })
        })
    } catch (error) {
      console.log('Error en _getAllProducts', error)
    }
  }

  useEffect(() => {
    _getAllProducts()
  }, [])

  return { allProducts, _getAllProducts }
}

export const useFetchAllCategories = () => {
  const [allCategories, setAllCategories] = useState([])

  useEffect(() => {
    ;(async () => {
      await getAllCategories()
        .then(({ data }) => {
          setAllCategories(data)
        })
        .catch(({ response }) => {
          ExecutionPermit({ response })
        })
    })()
  }, [])

  return { allCategories }
}
