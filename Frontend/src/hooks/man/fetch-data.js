import { useState, useEffect } from 'react'
import {
  getProductsForMan,
  getProductsForManFootwear,
  getProductsForManShirts,
  getProductsForManPants
} from '../../data/man/get.js'
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

export const useFetchManFootwear = () => {
  const [manFootwear, setManFootwear] = useState([])

  useEffect(() => {
    ;(async () => {
      await getProductsForManFootwear()
        .then(({ data }) => {
          setManFootwear(data)
        })
        .catch(({ response }) => {
          ExecutionPermit({ response })
        })
    })()
  }, [])

  return { manFootwear }
}

export const useFetchManShirts = () => {
  const [manShirts, setManShirts] = useState([])

  useEffect(() => {
    ;(async () => {
      await getProductsForManShirts()
        .then(({ data }) => {
          setManShirts(data)
        })
        .catch(({ response }) => {
          ExecutionPermit({ response })
        })
    })()
  }, [])

  return { manShirts }
}

export const useFetchManPants = () => {
  const [manPants, setManPants] = useState([])

  useEffect(() => {
    ;(async () => {
      await getProductsForManPants()
        .then(({ data }) => {
          setManPants(data)
        })
        .catch(({ response }) => {
          ExecutionPermit({ response })
        })
    })()
  }, [])

  return { manPants }
}
