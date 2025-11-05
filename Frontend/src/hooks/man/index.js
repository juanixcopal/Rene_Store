import { useState } from 'react'
import {
  useFetchManProducts,
  useFetchManFootwear,
  useFetchManShirts,
  useFetchManPants
} from './fetch-data'

export const useFetchInitMan = () => {
  const [valueTab, setValueTab] = useState(0)

  const handleChangeValueTab = (event, newValue) => {
    setValueTab(newValue)
  }

  const fetchManProducts = useFetchManProducts()
  const fetchManFootwear = useFetchManFootwear()
  const fetchManShirts = useFetchManShirts()
  const fetchManPants = useFetchManPants()

  return {
    valueTab,
    handleChangeValueTab,
    fetchManProducts,
    fetchManFootwear,
    fetchManShirts,
    fetchManPants
  }
}
