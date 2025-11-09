import { useState } from 'react'
import { useFechtAllProducts, useFetchAllCategories } from './fetch-data.js'
import { defaultDataModal, defaultDataNewProduct } from './default-data.js'
import { useActions } from './actions.js'

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
    setSelectedImage(null)
    setImagePreview(null)
    setNewProduct(defaultDataNewProduct)
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
    setNewProduct(defaultDataNewProduct)
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
  }

  const actions = useActions({ dataNewProduct, selectedImage, fechtAllProducts, toggle })

  return {
    fechtAllProducts,
    fetchAllCategories,
    dataModal,
    dataNewProduct,
    imagePreview,
    toggle,
    onClose,
    handleImageChange,
    handleInputNewProduct,
    actions
  }
}
