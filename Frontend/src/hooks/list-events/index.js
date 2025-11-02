import { useState } from 'react'
import { useFetchEvents, useFetchTypeEvent, useFetchHall } from './fetch-data.js'
import { defaultDataModal, defaultDataNewEvent } from './default-data.js'
import { useActions } from './actions.js'

export const useFetchInitListEvents = () => {
  const [page, setPage] = useState(1)
  const [chipData, setChipData] = useState([])
  const [anchorFilterTypeEvent, setAnchorFilterTypeEvent] = useState(null)
  const [anchorFilterHall, setAnchorFilterHall] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTypeEventIds, setSelectedTypeEventIds] = useState([])
  const [selectedHallIds, setSelectedHallIds] = useState([])
  const [dataModal, setDataModal] = useState(defaultDataModal)
  const [dataNewEvent, setDataNewEvent] = useState(defaultDataNewEvent)
  const [currentStep, setCurrentStep] = useState(1)

  const openFilterTypeEvent = Boolean(anchorFilterTypeEvent)
  const openFilterHall = Boolean(anchorFilterHall)

  const idFilterTypeEvent = openFilterTypeEvent ? 'popper-model' : undefined
  const idFilterHall = openFilterHall ? 'popper-color' : undefined

  const handleChangePage = page => {
    setPage(page)
  }

  const handleClickFilterTypeEvent = event => {
    setAnchorFilterTypeEvent(anchorFilterTypeEvent ? null : event.currentTarget)
  }

  const handleClickFilterHall = event => {
    setAnchorFilterHall(anchorFilterHall ? null : event.currentTarget)
  }

  const handleClearFilters = () => {
    setChipData([])
    setSearchTerm('')
    setSelectedTypeEventIds([])
    setSelectedHallIds([])
  }

  const handleSelectFilters = (item, type) => {
    const newChip = {
      key: chipData.length,
      label: type === 'type_event' ? item.type_event : item.hall_name,
      id: type === 'type_event' ? item.id_type_event : item.id_hall,
      type: type
    }

    if (!chipData.some(chip => chip.label === newChip.label)) {
      setChipData([...chipData, newChip])
      if (type === 'type_event') {
        setSelectedTypeEventIds(prev => [...prev, item.id_type_event])
      } else {
        setSelectedHallIds(prev => [...prev, item.id_hall])
      }
    }

    type === 'type_event' ? setAnchorFilterTypeEvent(null) : setAnchorFilterHall(null)
  }

  const handleDeleteFilterChip = chipToDelete => () => {
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key))
    if (chipToDelete.type === 'type_event') {
      setSelectedTypeEventIds(ids => ids.filter(id => id !== chipToDelete.id))
    } else {
      setSelectedHallIds(ids => ids.filter(id => id !== chipToDelete.id))
    }
  }

  const handleChangeSearchTerm = e => {
    setSearchTerm(e)
  }

  const handleNextStep = event => {
    event.preventDefault()
    setCurrentStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBackStep = () => {
    setCurrentStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleInputNewEvent = event => {
    setDataNewEvent({ ...dataNewEvent, [event.target.name]: event.target.value })

    const { name, value } = event.target;
    const selected =
      name === 'id_type_event'
        ? fetchTypeEvent.typeEvent.find(item => item.id_type_event === value)
        : fetchHall.hall.find(item => item.id_hall === value);

    if (!selected) return;

    const newData =
      name === 'id_type_event'
        ? { id_type_event: selected.id_type_event, type_event: selected.type_event }
        : { id_hall: selected.id_hall, hall_name: selected.hall_name };

    setDataNewEvent(prev => ({
      ...prev,
      ...newData
    }));
  }

  const toggle = (_, title, component, params) => {
    setDataModal({
      ...dataModal,
      open: !dataModal.open,
      title,
      component,
      params
    })
  }

  const onClose = (_, title, component, params) => {
    setDataModal({
      ...dataModal,
      open: !dataModal.open,
      title,
      component,
      params
    })
  }

  const fetchEvents = useFetchEvents({
    page,
    searchTerm,
    selectedTypeEventIds,
    selectedHallIds
  })
  const fetchTypeEvent = useFetchTypeEvent()
  const fetchHall = useFetchHall()
  const actions = useActions({
    dataNewEvent, toggle, fetchEvents
  })


  return {
    idFilterTypeEvent,
    idFilterHall,
    page,
    openFilterTypeEvent,
    openFilterHall,
    anchorFilterTypeEvent,
    anchorFilterHall,
    chipData,
    searchTerm,
    dataModal,
    dataNewEvent,
    currentStep,
    fetchEvents,
    fetchTypeEvent,
    fetchHall,
    handleChangePage,
    handleClickFilterTypeEvent,
    handleClickFilterHall,
    handleClearFilters,
    handleSelectFilters,
    handleDeleteFilterChip,
    handleChangeSearchTerm,
    handleNextStep,
    handleBackStep,
    handleInputNewEvent,
    toggle,
    onClose,
    actions
  }
}
