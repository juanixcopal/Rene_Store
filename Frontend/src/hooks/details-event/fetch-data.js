import { useState, useEffect } from "react";
import { getDetailsEvent, getHall, getTypeEvent } from "../../data/details-event/get.js";
import ExecutionPermit from '../../helpers/execution-permit-helper'

export const useFetchDeatilsEvent = ({idEvent}) => {
    const [detailsEvent, setDetailsEvent] = useState()
    const [loadingDetailsEvent, setLoadingDetailsEvent] = useState(false)
    

    const _getDetailsEvent = async () => {
      try {
        if (idEvent) {
          await getDetailsEvent({ idEvent })
            .then(({ data }) => {
              setDetailsEvent(data[0])
              setLoadingDetailsEvent(true)
            })
            .catch(({ response }) => {
              setLoadingDetailsEvent(false)
              ExecutionPermit({ response })
            })
        }
      } catch (error) {
        setLoadingDetailsEvent(false)
        console.log('Error useFetchEvent', error)
      }
    }

    useEffect(() => {
      _getDetailsEvent()
      // eslint-disable-next-line
    }, [idEvent])
  
  

      return {detailsEvent, loadingDetailsEvent, _getDetailsEvent}
}

export const useFetchTypeEvent = () => {
  const [typeEvent, setTypeEvent] = useState()
  const [loadingTypeEvent, setLoadingTypeEvent] = useState(false)

  useEffect(() => {
    ;(async () => {
      await getTypeEvent()
        .then(({ data }) => {
          setTypeEvent(data)
          setLoadingTypeEvent(true)
        })
        .catch(({ response }) => {
          setLoadingTypeEvent(false)
          ExecutionPermit({ response })
        })
    })()
  }, [])

  return { typeEvent, loadingTypeEvent }
}

export const useFetchHall = () => {
  const [hall, setHall] = useState()
  const [loadingHall, setLoadingHall] = useState(false)

  useEffect(() => {
    ;(async () => {
      await getHall()
        .then(({ data }) => {
          setHall(data)
          setLoadingHall(true)
        })
        .catch(({ response }) => {
          setLoadingHall(false)
          ExecutionPermit({ response })
        })
    })()
  }, [])

  return { hall, loadingHall }
}