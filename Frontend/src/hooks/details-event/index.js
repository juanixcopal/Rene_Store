import { useState } from "react"
import { useFetchDeatilsEvent, useFetchHall, useFetchTypeEvent } from "./fetch-data"

export const useFetchInitDetailsEvent = () => {
    const [idEvent, setIdEvent] = useState()
    const [valueTab, setValueTab] = useState(0)

    const handleChangeValueTab = (event, newValue) =>{
        setValueTab(newValue)
    }

    const handleChangeIdEvent = id => {
        setIdEvent(id)
    }

    const fetchDeatilsEvent = useFetchDeatilsEvent({idEvent})
    const fetchTypeEvent = useFetchTypeEvent()
    const fetchHall = useFetchHall()

    return{
        valueTab,
        idEvent,
        handleChangeIdEvent,
        handleChangeValueTab,
        fetchDeatilsEvent,
        fetchTypeEvent,
        fetchHall
    }
}