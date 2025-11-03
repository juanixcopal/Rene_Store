import { useState, useEffect } from 'react'
import { getProductsForMen } from '../../data/man/get.js'
import ExecutionPermit from '../../helpers/execution-permit-helper.js'

export const useFetchManProducts = () => {
    const [manProducts, setManProducts] = useState([])
  
    useEffect(() => {
      ;(async () => {
        await getProductsForMen()
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