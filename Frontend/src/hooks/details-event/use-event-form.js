import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { useActions } from "./actions"

export const useEventForm = (detailsEvent, idEvent, fetchDeatilsEvent) => {
  const [formData, setFormData] = useState({
    event_name: '',
    id_type_event: '',
    id_hall: '',
    start_date: null,
    start_time: null,
    end_date: null,
    end_time: null,
    description: ''
  })
  const [isModified, setIsModified] = useState(true)
  const [initialData, setInitialData] = useState(null)


  useEffect(() => {
    if (detailsEvent) {
      const initial = {
        event_name: detailsEvent.event_name || '',
        id_type_event: detailsEvent.type?.id_type_event || '',
        id_hall: detailsEvent.hall?.id_hall || '',
        start_date: detailsEvent.start_date ? dayjs(detailsEvent.start_date) : null,
        start_time: detailsEvent.start_time ? dayjs(detailsEvent.start_time, 'HH:mm') : null,
        end_date: detailsEvent.end_date ? dayjs(detailsEvent.end_date) : null,
        end_time: detailsEvent.end_time ? dayjs(detailsEvent.end_time, 'HH:mm') : null,
        description: detailsEvent.description || ''
      }
  
      setFormData(initial)
      setInitialData(initial)
      setIsModified(false)
    }
  }, [detailsEvent])

  useEffect(() => {
    if (!initialData) return;
  
    const hasChanged = Object.keys(formData).some(key => {
      const val1 = formData[key];
      const val2 = initialData[key];
      if (dayjs.isDayjs(val1) && dayjs.isDayjs(val2)) {
        return !val1.isSame(val2);
      }
      return val1 !== val2;
    });
  
    setIsModified(!hasChanged);
  }, [formData, initialData]);
  
  

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleDateChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleChangeTime = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }
  

  const formatData = () => ({
    ...formData,
    start_date: formData.start_date?.format('YYYY-MM-DD'),
    end_date: formData.end_date?.format('YYYY-MM-DD'),
    start_time: formData.start_time?.format('HH:mm'),
    end_time: formData.end_time?.format('HH:mm')
  })
  

  const actions = useActions({ fetchDeatilsEvent, formatData, idEvent })


  return {
    formData,
    handleChange,
    handleDateChange,
    handleChangeTime,
    isModified,
    actions
  }
}
