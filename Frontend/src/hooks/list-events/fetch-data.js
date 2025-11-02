import { useState, useEffect } from 'react'
import { getEvents, getTypeEvent, getHall } from '../../data/list-events/get'
import ExecutionPermit from '../../helpers/execution-permit-helper'

export const useFetchEvents = ({ page, searchTerm, selectedTypeEventIds, selectedHallIds }) => {
  const [events, setEvents] = useState()
  const [loadingEvents, setLoadingEvents] = useState(false)

  const _getEvents = async () => {
    try {
      const params = {
        page,
        limit: 6
      }

      if (searchTerm) params.search = searchTerm
      if (selectedTypeEventIds?.length > 0) params['id_type_event[]'] = selectedTypeEventIds
      if (selectedHallIds?.length > 0) params['id_hall[]'] = selectedHallIds

      await getEvents(params)
        .then(({ data }) => {
          setEvents(data)
          setLoadingEvents(true)
        })
        .catch(({ response }) => {
          setLoadingEvents(false)
          ExecutionPermit({ response })
        })
    } catch (error) {
      setLoadingEvents(false)
      console.log('Error useFetchEvents', error)
    }
  }

  useEffect(() => {
    _getEvents()
    // eslint-disable-next-line
  }, [page, searchTerm, selectedTypeEventIds, selectedHallIds])

  return { events, _getEvents, loadingEvents }
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
