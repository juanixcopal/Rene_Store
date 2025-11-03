import { useState, useEffect } from 'react'
import { get5ManProducts, get5WomenProducts } from '../../data/home/get.js'
import ExecutionPermit from '../../helpers/execution-permit-helper.js'

export const useFetch5ManProducts = () => {
    const [fiveManProducts, setFiveManProducts] = useState([])
  
    useEffect(() => {
      ;(async () => {
        await get5ManProducts()
          .then(({ data }) => {
            setFiveManProducts(data)
          })
          .catch(({ response }) => {
            ExecutionPermit({ response })
          })
      })()
    }, [])
  
    return { fiveManProducts }
}

export const useFetch5WomenProducts = () => {
    const [fiveWomenProducts, setFiveWomenProducts] = useState([])
  
    useEffect(() => {
      ;(async () => {
        await get5WomenProducts()
          .then(({ data }) => {
            setFiveWomenProducts(data)
          })
          .catch(({ response }) => {
            ExecutionPermit({ response })
          })
      })()
    }, [])
  
    return { fiveWomenProducts }
}