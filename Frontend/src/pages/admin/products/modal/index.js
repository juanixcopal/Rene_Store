import { Modal, Box, Typography } from '@mui/material'
import NewProduct from './new-product'
import EditProduct from './edit-product'
import DeleteProduct from './delete-product'

const MainModal = ({ useFetchInit }) => {
  const { dataModal } = useFetchInit
  const { open, title, component } = dataModal

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 600,
    background: '#FFFFFF',
    borderRadius: '8px',
    padding: '24px'
  }

  return (
    <>
      <Modal open={open}>
        <Box sx={style}>
          <Typography fontSize={'20px'} fontWeight={600} color='#424242'>
            {title}
          </Typography>
          {component === 'new-product' && <NewProduct useFetchInit={useFetchInit} />}
          {component === 'edit-product' && <EditProduct useFetchInit={useFetchInit} />}
          {component === 'delete-product' && <DeleteProduct useFetchInit={useFetchInit} />}
        </Box>
      </Modal>
    </>
  )
}

export default MainModal
