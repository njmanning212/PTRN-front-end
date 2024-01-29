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
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault();
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      await authService.login(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
    }
  }

  const { email, password } = formData

  const isformInvalid = (): boolean => {
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handleChange}
            autoFocus
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
            disabled={isformInvalid()}
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}























// // npm modules
// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// // services
// import * as authService from '../../services/authService'

// // css
// import styles from './Login.module.css'

// // types
// import { AuthPageProps } from '../../types/props'
// import { LoginFormData } from '../../types/forms'
// import { handleErrMsg } from '../../types/validators'

// const LoginPage = (props: AuthPageProps): JSX.Element => {
//   const { handleAuthEvt } = props
//   const navigate = useNavigate()

//   const [message, setMessage] = useState('')
//   const [formData, setFormData] = useState<LoginFormData>({
//     email: '',
//     password: '',
//   })

//   const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
//     setMessage('')
//     setFormData({ ...formData, [evt.target.name]: evt.target.value })
//   }

//   const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
//     evt.preventDefault()
//     try {
//       if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
//         throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
//       }
//       await authService.login(formData)
//       handleAuthEvt()
//       navigate('/')
//     } catch (err) {
//       console.log(err)
//       handleErrMsg(err, setMessage)
//     }
//   }

//   const { email, password } = formData

//   const isFormInvalid = (): boolean => {
//     return !(email && password)
//   }

//   return (
//     <main className={styles.container}>
//       <h1>Log In</h1>
//       <p className={styles.message}>{message}</p>
//       <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
//         <label className={styles.label}>
//           Email
//           <input
//             type="text"
//             value={email}
//             name="email"
//             onChange={handleChange}
//           />
//         </label>
//         <label className={styles.label}>
//           Password
//           <input
//             type="password"
//             value={password}
//             name="password"
//             onChange={handleChange}
//           />
//         </label>
//         <div>
//           <Link to="/">Cancel</Link>
//           <button className={styles.button} disabled={isFormInvalid()}>
//             Log In
//           </button>
//         </div>
//       </form>
//     </main>
//   )
// }

// export default LoginPage
