import { Typography } from '@mui/material'
import StepOne from './steps/step-one'
import StepTwo from './steps/step-two'

const NewEvent = ({ useFetchInit }) => {
  const { currentStep } = useFetchInit

  const renderSteps = step => {
    switch (step) {
      case 1:
        return <StepOne useFetchInit={useFetchInit} />
      case 2:
        return <StepTwo useFetchInit={useFetchInit} />
      default:
        return null
    }
  }

  return (
    <>
      <Typography
        sx={{
          color: theme => theme.palette.neutral[500],
          fontSize: '13px',
          fontWeight: 400
        }}
      >
        Paso {currentStep} de 2
      </Typography>
      {renderSteps(currentStep)}
    </>
  )
}

export default NewEvent
