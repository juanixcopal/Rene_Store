import { Typography, IconButton } from '@mui/material'
import './index.css'
import { useNavigate } from 'react-router-dom'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

const HeaderInvitaPRO = ({ titlePage, goBack }) => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }


  return (
    <>
      <div className='container-header'>
        {goBack && (
          <IconButton onClick={handleGoBack}>
            <KeyboardBackspaceIcon sx={{
                width: '25px',
                height: '25px',
                color: '#424242'
              }}
 />
          </IconButton>
        )}
        <Typography fontSize={'22px'} fontWeight={600}>
          {titlePage}
        </Typography>
      </div>
    </>
  )
}

export default HeaderInvitaPRO
