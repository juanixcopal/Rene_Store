import { useState, useEffect } from 'react'
import {
  getProductsForWoman,
  getProductsForWomanBlouses,
  getProductsForWomanFootwear,
  getProductsForWomanPants
} from '../../data/woman/get.js'
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

export const useFetchWomanFootwear = () => {
  const [womanFootwear, setWomanFootwear] = useState([])

  useEffect(() => {
    ;(async () => {
      await getProductsForWomanFootwear()
        .then(({ data }) => {
          setWomanFootwear(data)
        })
        .catch(({ response }) => {
          ExecutionPermit({ response })
        })
    })()
  }, [])

  return { womanFootwear }
}

export const useFetchWomanBlouses = () => {
  const [womanBlouses, setWomanBlouses] = useState([])

  useEffect(() => {
    ;(async () => {
      await getProductsForWomanBlouses()
        .then(({ data }) => {
          setWomanBlouses(data)
        })
        .catch(({ response }) => {
          ExecutionPermit({ response })
        })
    })()
  }, [])

  return { womanBlouses }
}

export const useFetchWomanPants = () => {
  const [womanPants, setWomanPants] = useState([])

  useEffect(() => {
    ;(async () => {
      await getProductsForWomanPants()
        .then(({ data }) => {
          setWomanPants(data)
        })
        .catch(({ response }) => {
          ExecutionPermit({ response })
        })
    })()
  }, [])

  return { womanPants }
}
