import { Modal, Box, Typography } from '@mui/material'
import NewEvent from './new-event'
import './index.css'
const MainModal = ({ useFetchInit }) => {
  const { dataModal, onClose } = useFetchInit
  const { open, title, component } = dataModal

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box className='style-modal-new-event'>
          <Typography fontSize={'20px'} fontWeight={600}>
            {title}
          </Typography>
          {component === 'new-event' && <NewEvent useFetchInit={useFetchInit} />}
        </Box>
      </Modal>
    </>
  )
}

export default MainModal
