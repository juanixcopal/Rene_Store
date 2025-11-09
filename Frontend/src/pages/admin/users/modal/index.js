import { Modal, Box, Typography } from '@mui/material'
import NewUser from './new-user'
import EditUser from './edit-user'

const MainModal = ({ useFetchInit }) => {
  const { dataModal } = useFetchInit
  const { open, title, component } = dataModal

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
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
          {component === 'new-user' && <NewUser useFetchInit={useFetchInit} />}
          {component === 'edit-user' && <EditUser useFetchInit={useFetchInit} />}
        </Box>
      </Modal>
    </>
  )
}

export default MainModal
