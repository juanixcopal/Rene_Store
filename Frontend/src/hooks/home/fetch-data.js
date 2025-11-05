import { useState, useEffect } from 'react'
import { get5ManProducts, get5WomanProducts } from '../../data/home/get.js'
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

export const useFetch5WomanProducts = () => {
  const [fiveWomanProducts, setFiveWomanProducts] = useState([])

  useEffect(() => {
    ;(async () => {
      await get5WomanProducts()
        .then(({ data }) => {
          setFiveWomanProducts(data)
        })
        .catch(({ response }) => {
          ExecutionPermit({ response })
        })
    })()
  }, [])

  return { fiveWomanProducts }
}
