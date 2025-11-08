import { useState } from 'react'
import { useFechtAllProducts, useFetchAllCategories } from './fetch-data.js'
import { defaultDataModal, defaultDataNewProduct } from './default-data.js'

export const useFechtInitProducts = () => {
  const fechtAllProducts = useFechtAllProducts()
  const fetchAllCategories = useFetchAllCategories()
  const [dataModal, setDataModal] = useState(defaultDataModal)
  const [dataNewProduct, setNewProduct] = useState(defaultDataNewProduct)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

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
    setSelectedImage(null)
    setImagePreview(null)
  }

  const handleImageChange = event => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(file)

      // Crear preview de la imagen
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputNewProduct = event => {
    setNewProduct({ ...dataNewProduct, [event.target.name]: event.target.value })
    console.log(dataNewProduct)

    // const { name, value } = event.target;
    // const selected =
    //   name === 'id_type_event'
    //     ? fetchTypeEvent.typeEvent.find(item => item.id_type_event === value)
    //     : fetchHall.hall.find(item => item.id_hall === value);

    // if (!selected) return;

    // const newData =
    //   name === 'id_type_event'
    //     ? { id_type_event: selected.id_type_event, type_event: selected.type_event }
    //     : { id_hall: selected.id_hall, hall_name: selected.hall_name };

    // setDataNewEvent(prev => ({
    //   ...prev,
    //   ...newData
    // }));
  }

  return {
    fechtAllProducts,
    fetchAllCategories,
    dataModal,
    dataNewProduct,
    imagePreview,
    toggle,
    onClose,
    handleImageChange,
    handleInputNewProduct
  }
}
