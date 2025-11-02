import './index.css'
import {
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  Chip,
  IconButton,
  InputAdornment
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { useFetchInitLogin } from '../../hooks/login'
import logo from '../../images/logo.png'

const LoginPage = () => {
  const loginHook = useFetchInitLogin()

  const {
    step,
    login,
    showPassword,
    message,
    handleBackStep,
    handleNextStep,
    handleInput,
    handleShowPassword,
    loginAction
  } = loginHook

  return (
    <>
      <div className='background-image-login'>
        <div className='container-login'>
          <Card
            sx={{
              padding: '48px',
              minHeight: '300px',
              minWidth: '810px',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '18px'
            }}
          >
            <Grid container>
              <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
                <div className='container-logo-app'>
                  <img style={{ width: '35px', height: '35px' }} src={logo} alt='Logo' />
                </div>
                <Typography
                  sx={{
                    color: theme => theme.palette.neutral[900],
                    fontSize: '22px',
                    fontWeight: 400,
                    marginBottom: '8px'
                  }}
                >
                  InvitaPRO
                </Typography>
                <Typography
                  sx={{
                    color: theme => theme.palette.neutral[600],
                    fontSize: '12px',
                    fontWeight: 400,
                    paddingRight: '30px'
                  }}
                >
                  Plataforma de gestión de eventos
                </Typography>
              </Grid>

              {step === 1 && (
                <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
                  <Typography
                    sx={{
                      color: theme => theme.palette.neutral[900],
                      fontSize: '18px',
                      fontWeight: 400,
                      marginBottom: '16px'
                    }}
                  >
                    Iniciar sesión
                  </Typography>
                  <Typography
                    sx={{
                      color: theme => theme.palette.neutral[600],
                      fontSize: '12px',
                      fontWeight: 400,
                      marginBottom: '16px'
                    }}
                  >
                    Introduzca su usuario para continuar
                  </Typography>
                  <form>
                    <div className='container-username'>
                      <TextField
                        label='Usuario'
                        name='username'
                        onChange={handleInput}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '8px 0 0 8px'
                          }
                        }}
                      />
                      <Button
                        variant='contained'
                        sx={{
                          borderRadius: '0 8px 8px 0',
                          minHeight: '39px',
                          minWidth: '10px',
                          padding: '6px 10px'
                        }}
                        type='submit'
                        disabled={!login.username}
                        onClick={handleNextStep}
                      >
                        <ArrowForwardIcon sx={{ width: '20px', height: '20px' }} />
                      </Button>
                    </div>
                  </form>
                </Grid>
              )}

              {step === 2 && (
                <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
                  <Typography
                    sx={{
                      color: theme => theme.palette.neutral[900],
                      fontSize: '18px',
                      fontWeight: 400,
                      marginBottom: '12px'
                    }}
                  >
                    Iniciar sesión
                  </Typography>

                  <Chip
                    icon={<AccountCircleIcon sx={{ width: '24px', height: '24px' }} />}
                    label={login.username}
                    variant='filled'
                    size='small'
                    onDelete={handleBackStep}
                    sx={{ marginBottom: '16px' }}
                  />

                  <form>
                    <div className='container-username'>
                      <TextField
                        label='Contraseña'
                        name='password'
                        onChange={handleInput}
                        type={showPassword ? 'text' : 'password'}
                        error={!message.result}
                        helperText={message.message}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '8px 0 0 8px'
                          }
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton onClick={handleShowPassword} edge='end'>
                                {showPassword ? (
                                  <VisibilityOffOutlinedIcon />
                                ) : (
                                  <VisibilityOutlinedIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                      <Button
                        variant='contained'
                        sx={{
                          borderRadius: '0 8px 8px 0',
                          minHeight: '39px',
                          minWidth: '10px',
                          padding: '6px 10px'
                        }}
                        disabled={!login.password}
                        type='submit'
                        onClick={loginAction}
                      >
                        <ArrowForwardIcon sx={{ width: '20px', height: '20px' }} />
                      </Button>
                    </div>
                  </form>
                </Grid>
              )}
            </Grid>
          </Card>
        </div>
      </div>
    </>
  )
}

export default LoginPage
