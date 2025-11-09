import { Grid, TextField, Button, Box, Typography, MenuItem } from '@mui/material'
import { useState, useEffect } from 'react'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'

const EditProduct = ({ useFetchInit }) => {
  const { dataModal, onClose, fetchAllCategories, handleChangeDataProduct, actions } = useFetchInit
  const { params } = dataModal

  const { allCategories } = fetchAllCategories
  const { editProduct } = actions

  const [defaultDataProduct, setDefaultDataProduct] = useState({
    _id: params._id,
    name: params.name,
    description: params.description,
    price: params.price,
    stock: params.stock,
    idCategory: params.category_id._id
  })

  const [imagePreview, setImagePreview] = useState(params.image)
  const [newImage, setNewImage] = useState(null)

  const handleChange = event => {
    const { name, value } = event.target

    setDefaultDataProduct(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const handleImageChange = event => {
    const file = event.target.files[0]
    if (file) {
      setNewImage(file)

      // Crear preview de la nueva imagen
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    // Solo agregar image si hay una nueva imagen seleccionada
    const dataToSend = newImage ? { ...defaultDataProduct, image: newImage } : defaultDataProduct

    handleChangeDataProduct(dataToSend)
  }, [defaultDataProduct, newImage, handleChangeDataProduct])

  return (
    <form onSubmit={editProduct}>
      <Grid container spacing={'16px'} sx={{ paddingTop: '10px' }}>
        <Grid size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
          <Grid container spacing={2}>
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <TextField
                label='Nombre del producto'
                name='name'
                defaultValue={params.name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <TextField
                label='Descripción'
                name='description'
                defaultValue={params.description}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <TextField
                label='Precio'
                name='price'
                type='number'
                defaultValue={params.price}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <TextField
                label='Stock'
                name='stock'
                type='number'
                defaultValue={params.stock}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <TextField
                label='Categoría'
                name='idCategory'
                defaultValue={params.category_id._id}
                onChange={handleChange}
                select
                required
              >
                {allCategories.map(item => {
                  return (
                    <MenuItem key={item._id} id={item._id} value={item._id}>
                      {item.product} - {item.gender}
                    </MenuItem>
                  )
                })}
              </TextField>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
          <Box
            sx={{
              border: '2px dashed #E8DDD8',
              borderRadius: '8px',
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              '&:hover': {
                borderColor: '#7B2D26',
                backgroundColor: '#FFF5F4'
              }
            }}
            onClick={() => document.getElementById('image-upload-edit').click()}
          >
            <input
              id='image-upload-edit'
              type='file'
              accept='.jpg,.jpeg,.png,.webp'
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />

            {imagePreview ? (
              <Box>
                <img
                  src={imagePreview}
                  alt='Preview'
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    borderRadius: '8px',
                    marginBottom: '10px'
                  }}
                />
                <Typography fontSize={14} fontWeight={500} sx={{ color: '#7B2D26' }}>
                  {newImage ? 'Nueva imagen seleccionada' : 'Imagen actual'} - Click para cambiar
                </Typography>
              </Box>
            ) : (
              <Box>
                <CloudUploadOutlinedIcon sx={{ fontSize: 48, color: '#7B2D26', mb: 1 }} />
                <Typography fontSize={16} fontWeight={500} sx={{ color: '#3E2F2F', mb: 0.5 }}>
                  Cargar imagen del producto
                </Typography>
                <Typography fontSize={14} fontWeight={400} sx={{ color: '#8B7B7B' }}>
                  Click para seleccionar
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>

        <Grid size={{ lg: 12, md: 6, sm: 6, xs: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='text' sx={{ color: '#3E2F2F' }} onClick={onClose}>
              Cancelar
            </Button>
            <Button variant='text' type='submit'>
              Guardar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

export default EditProduct
