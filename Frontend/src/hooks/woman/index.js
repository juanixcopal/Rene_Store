import { useState } from "react"
import { useFetchWomanProducts } from './fetch-data'

export const useFetchInitMan = () => {
    const [valueTab, setValueTab] = useState(0)

    const handleChangeValueTab = (event, newValue) =>{
        setValueTab(newValue)
    }

    const fetchWomanProducts = useFetchWomanProducts()

    return{
        valueTab,
        handleChangeValueTab,
        fetchWomanProducts
    }
}