import { useState } from "react"
import { useFetchManProducts } from './fetch-data'

export const useFetchInitMan = () => {
    const [valueTab, setValueTab] = useState(0)

    const handleChangeValueTab = (event, newValue) =>{
        setValueTab(newValue)
    }

    const fetchManProducts = useFetchManProducts()

    return{
        valueTab,
        handleChangeValueTab,
        fetchManProducts
    }
}