//npm modules
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//types
import { AuthPageProps } from '../../types/props';
import { LoginFormData } from '../../types/forms';
import { handleErrMsg } from '../../types/validators';

//services
import * as authService from '../../services/authService';

//components
import Copyright from '../../components/Copyright/Copyright';

// MUI icons/components
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function LoginPage(props: AuthPageProps) {
  const { handleAuthEvt } = props
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [emailError, setEmailError] = useState<boolean>(false)
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage('')
    setEmailError(false)
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault();
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        setEmailError(true);
        throw new Error('Invalid email address')
      }

      const loginResult = await authService.login(formData)
      if (typeof loginResult === 'string') {
        throw new Error(loginResult)
      }
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
    }
  }

  const { email, password } = formData

  const isFormInvalid = (): boolean => {
    return !(email && password)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {emailError && (
          <Typography variant="body2" color="error" align="center" sx={{ mt: 5 }}>
            {message}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            type='email'
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handleChange}
            error={emailError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isFormInvalid()}
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/auth/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5, mb: 4 }} />
    </Container>
  );
}
