import { useState } from "react"
import { useFetchWomenProducts } from './fetch-data'

export const useFetchInitMan = () => {
    const [valueTab, setValueTab] = useState(0)

    const handleChangeValueTab = (event, newValue) =>{
        setValueTab(newValue)
    }

    const fetchWomenProducts = useFetchWomenProducts()

    return{
        valueTab,
        handleChangeValueTab,
        fetchWomenProducts
    }
}