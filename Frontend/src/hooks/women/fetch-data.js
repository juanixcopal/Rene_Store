import { useState, useEffect } from 'react'
import { getProductsForWomen } from '../../data/women/get.js'
import ExecutionPermit from '../../helpers/execution-permit-helper.js'

export const useFetchWomenProducts = () => {
    const [womenProducts, setWomenProducts] = useState([])
  
    useEffect(() => {
      ;(async () => {
        await getProductsForWomen()
          .then(({ data }) => {
            setWomenProducts(data)
          })
          .catch(({ response }) => {
            ExecutionPermit({ response })
          })
      })()
    }, [])
  
    return { womenProducts }
}