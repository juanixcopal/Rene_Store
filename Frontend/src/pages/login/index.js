import { Box, TextField, Button, Typography, Link, Card } from '@mui/material'
import logo from '../../images/logo-login.png'
import { useFetchInitLogin } from '../../hooks/login/index.js'

const LoginPage = () => {
  const loginHook = useFetchInitLogin()

  const {
    isRegister,
    handleToggle,
    handleInput,
    loginAction,
    handleInputNewUser,
    registerAction,
    message
  } = loginHook

  const { message: _message, result } = message

  return (
    <Box sx={{ display: 'flex', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Contenedor principal deslizante */}
      <Box
        sx={{
          display: 'flex',
          width: '200%',
          height: '100%',
          transform: isRegister ? 'translateX(-50%)' : 'translateX(0)',
          transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }}
      >
        {/* Login Card */}
        <Card
          sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,
            borderRadius: '0 65px 65px 0',
            border: 'none',
            gap: 3,
            p: 2
          }}
        >
          <Typography fontSize={75} fontWeight={500}>
            Bienvenid@
          </Typography>

          <Card
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 5, gap: 3 }}
          >
            <Typography fontSize={45} fontWeight={500} color='#3E2F2F'>
              Iniciar sesión
            </Typography>

            <Box
              component='form'
              onSubmit={loginAction}
              sx={{
                width: '100%',
                maxWidth: 260,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
            >
              <TextField
                label='Correo electrónico'
                name='email'
                onChange={handleInput}
                required
                error={result}
              />
              <TextField
                label='Contraseña'
                name='password'
                type='password'
                onChange={handleInput}
                required
                error={result}
                helperText={result ? _message : ''}
              />

              <Button variant='contained' type='submit'>
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

        {/* Imagen */}
        <Card
          sx={{
            background: '#F6EFEE',
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,
            borderRadius: 0,
            border: 'none'
          }}
        >
          <Box
            sx={{
              width: 400,
              height: 400,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img src={logo} alt='Logo' style={{ width: 580, height: 580 }} />
          </Box>
        </Card>
      </Box>

      {/* Registro Card */}
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
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,
            borderRadius: '65px 0 0 65px',
            border: 'none',
            gap: 3,
            p: 2
          }}
        >
          <Typography fontSize={75} fontWeight={500}>
            ¡Hazte cliente!
          </Typography>

          <Card
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 5, gap: 3 }}
          >
            <Typography fontSize={45} fontWeight={500} color='#3E2F2F'>
              Registrarse
            </Typography>

            <Box
              component='form'
              onSubmit={registerAction}
              sx={{
                width: '100%',
                maxWidth: 260,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
            >
              <TextField label='Nombres' name='user_name' onChange={handleInputNewUser} required />
              <TextField
                label='Apellidos'
                name='user_lastname'
                onChange={handleInputNewUser}
                required
              />
              <TextField
                label='Correo electrónico'
                name='email'
                onChange={handleInputNewUser}
                required
              />
              <TextField
                label='Contraseña'
                name='password'
                type='password'
                onChange={handleInputNewUser}
                required
              />
              <TextField
                label='Repetir contraseña'
                name='repeat_password'
                type='password'
                onChange={handleInputNewUser}
                required
              />
              <Button variant='contained' type='submit'>
                REGISTRARSE
              </Button>
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
