import { Box, TextField, Button, Typography, Link, Card } from '@mui/material'
import logo from '../../images/logo-login.png'
import { useFetchInitLogin } from '../../hooks/login/index.js'

const LoginPage = () => {
  const loginHook = useFetchInitLogin()

  const { isRegister, handleToggle, handleInput, loginAction } = loginHook

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '200%',
          height: '100%',
          transform: isRegister ? 'translateX(-50%)' : 'translateX(0)',
          transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }}
      >
        <Card
          style={{ width: '50%', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}
          sx={{ borderRadius: '0 65px 65px 0', border: 'none', gap: '30px' }}
        >
          <Typography fontSize={75} fontWeight={500}>
            Bienvenid@
          </Typography>

          <Card
            style={{ justifyContent: 'center', alignItems: 'center' }}
            sx={{ padding: '40px', gap: '30px' }}
          >
            <Typography fontSize={45} fontWeight={500} color='#3E2F2F'>
              Iniciar sesión
            </Typography>
            <Box
              component='form'
              sx={{
                width: '100%',
                maxWidth: 260,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              <TextField label='Correo electrónico' name='email' onChange={handleInput} required />
              <TextField
                label='Contraseña'
                name='password'
                onChange={handleInput}
                type='password'
                required
              />
              <Button variant='contained' type='submit' onClick={loginAction}>
                INICIAR SESIÓN
              </Button>
            </Box>

            <Typography fontSize={15} color='#7A6E6E'>
              ¿Aún no tienes una cuenta?{' '}
              <Link
                underline='hover'
                color='#D8A39D'
                onClick={e => {
                  e.preventDefault()
                  handleToggle()
                }}
                sx={{ cursor: 'pointer' }}
              >
                Regístrate gratis
              </Link>
            </Typography>
          </Card>
        </Card>

        <Card
          style={{
            background: '#F6EFEE',
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0
          }}
          sx={{ borderRadius: '0px', border: 'none' }}
        >
          <Box
            sx={{
              width: '400px',
              height: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img style={{ width: '580px', height: '580px' }} src={logo} alt='Logo' />
          </Box>
        </Card>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          right: 0,
          width: '50%',
          height: '100%',
          transform: isRegister ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }}
      >
        <Card
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0
          }}
          sx={{ borderRadius: '65px 0 0 65px', border: 'none', gap: '30px' }}
        >
          <Typography fontSize={75} fontWeight={500}>
            Bienvenid@
          </Typography>

          <Card
            style={{ justifyContent: 'center', alignItems: 'center' }}
            sx={{ padding: '40px', gap: '30px' }}
          >
            <Typography fontSize={45} fontWeight={500} color='#3E2F2F'>
              Registrarse
            </Typography>
            <Box
              component='form'
              sx={{
                width: '100%',
                maxWidth: 260,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              <TextField label='Nombres' variant='outlined' fullWidth />
              <TextField label='Apellidos' variant='outlined' fullWidth />
              <TextField label='Correo electrónico' variant='outlined' fullWidth />
              <TextField label='Contraseña' type='password' variant='outlined' fullWidth />
              <TextField
                label='Confirmar contraseña'
                type='password'
                variant='outlined'
                fullWidth
              />
              <Button variant='contained'>REGISTRARSE</Button>
            </Box>

            <Typography fontSize={15} color='#7A6E6E'>
              ¿Ya tienes una cuenta?{' '}
              <Link
                underline='hover'
                color='#D8A39D'
                onClick={e => {
                  e.preventDefault()
                  handleToggle()
                }}
                sx={{ cursor: 'pointer' }}
              >
                Inicia sesión
              </Link>
            </Typography>
          </Card>
        </Card>
      </Box>
    </Box>
  )
}

export default LoginPage
