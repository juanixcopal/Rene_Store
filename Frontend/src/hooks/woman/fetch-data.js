import { useState, useEffect } from 'react'
import { getProductsForWoman } from '../../data/woman/get.js'
import ExecutionPermit from '../../helpers/execution-permit-helper.js'

export const useFetchWomanProducts = () => {
    const [womanProducts, setWomanProducts] = useState([])
  
    useEffect(() => {
      ;(async () => {
        await getProductsForWoman()
          .then(({ data }) => {
            setWomanProducts(data)
          })
          .catch(({ response }) => {
            ExecutionPermit({ response })
          })
      })()
    }, [])
  
    return { womanProducts }
}