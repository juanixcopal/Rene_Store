import { useState, useEffect } from 'react'
import { getProductsForMan, getProductsForManFootwear } from '../../data/man/get.js'
import ExecutionPermit from '../../helpers/execution-permit-helper.js'

export const useFetchManProducts = () => {
    const [manProducts, setManProducts] = useState([])
  
    useEffect(() => {
      ;(async () => {
        await getProductsForMan()
          .then(({ data }) => {
            setManProducts(data)
          })
          .catch(({ response }) => {
            ExecutionPermit({ response })
          })
      })()
    }, [])
  
    return { manProducts }
}

export const useFetchMansFootwear = () => {
  const [manProducts, setManProducts] = useState([])

  useEffect(() => {
    ;(async () => {
      await getProductsForManFootwear()
        .then(({ data }) => {
          setManProducts(data)
        })
        .catch(({ response }) => {
          ExecutionPermit({ response })
        })
    })()
  }, [])

  return { manProducts }
}