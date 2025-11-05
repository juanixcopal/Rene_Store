import { useState } from 'react'
import {
  useFetchWomanProducts,
  useFetchWomanBlouses,
  useFetchWomanFootwear,
  useFetchWomanPants
} from './fetch-data'

export const useFetchInitMan = () => {
  const [valueTab, setValueTab] = useState(0)

  const handleChangeValueTab = (event, newValue) => {
    setValueTab(newValue)
  }

  const fetchWomanProducts = useFetchWomanProducts()
  const fetchWomanBlouses = useFetchWomanBlouses()
  const fetchWomanFootwear = useFetchWomanFootwear()
  const fetchWomanPants = useFetchWomanPants()

  return {
    valueTab,
    handleChangeValueTab,
    fetchWomanProducts,
    fetchWomanBlouses,
    fetchWomanFootwear,
    fetchWomanPants
  }
}
