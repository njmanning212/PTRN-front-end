// npm modules
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import * as authService from '../../services/authService'

// types
import { SignupFormData, PhotoFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'
import { AuthPageProps } from '../../types/props'

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
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../state/store'
import { setUserAsync } from '../../state/user/userSlice'


const Signup = (props: AuthPageProps): JSX.Element => {
  const { handleAuthEvt } = props
  const navigate = useNavigate()
  const imgInputRef = useRef<HTMLInputElement | null>(null)
  const reduxUser = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [adminSignUp, setAdminSignUp] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [matchingPasswords, setMatchingPasswords] = useState(true)
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    isAdmin: false,
    adminCode: ''
  })
  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setMessage('')
    setEmailError(false)
    setMatchingPasswords(true)
    if (evt.target.name === 'isAdmin') {
      setFormData({ ...formData, [evt.target.name]: evt.target.checked })
      setAdminSignUp(!adminSignUp)
      return
    }
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) return
    const file = evt.target.files[0]
    let isFileInvalid = false
    let errMsg = ""
    const validFormats = ['gif', 'jpeg', 'jpg', 'png', 'svg', 'webp']
    const photoFormat = file.name.split('.').at(-1)

    // cloudinary supports files up to 10.4MB each as of May 2023
    if (file.size >= 10485760) {
      errMsg = "Image must be smaller than 10.4MB"
      isFileInvalid = true
    }
    if (photoFormat && !validFormats.includes(photoFormat)) {
      errMsg = "Image must be in gif, jpeg/jpg, png, svg, or webp format"
      isFileInvalid = true
    }

    setMessage(errMsg)

    if (isFileInvalid && imgInputRef.current) {
      imgInputRef.current.value = ""
      return
    }

    setPhotoData({ photo: evt.target.files[0] })
  }

  const { firstName, lastName, email, phoneNumber, password, confirmPassword, isAdmin, adminCode } = formData

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        setEmailError(true);
        throw new Error('Invalid email address')
      }

      if (password !== confirmPassword) {
        setMatchingPasswords(false)
        throw new Error('Passwords do not match')
      }

      setIsSubmitted(true)
      const signUpResult = await authService.signup(formData, photoData)

      if (typeof signUpResult === 'string') {
        throw new Error(signUpResult)
      }
      
      // handleAuthEvt()
      dispatch(setUserAsync())
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
      setIsSubmitted(false)
    }
  }

  const isFormInvalid = () => {
    return !(firstName && lastName && email && password && confirmPassword)
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
          Sign Up
        </Typography>
        {message && (
          <Typography
            variant="body2"
            color="error"
            align="center"
            sx={{ mt: 5 }}
          >
            {message}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete='email'
            value={email}
            onChange={handleChange}
            error={emailError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
          >
          </TextField>
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
            error={!matchingPasswords}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            error={!matchingPasswords}
          />

          <FormControlLabel
            control={<Checkbox value={isAdmin} onChange={handleChange} name="isAdmin" />}
            label="Admin Sign Up"
          />
          {adminSignUp && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="adminCode"
              label="Admin Code"
              type="password"
              id="adminCode"
              value={adminCode}
              onChange={handleChange}
            />
          )}
          <Typography
            component="h2"
            variant="h6"
            align='center'
            mt={3}
          >
            Optional: Add Profile Photo
          </Typography>
          <Input
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 3
            }}
            type="file"
            name="photo"
            onChange={handleChangePhoto}
            ref={imgInputRef}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isFormInvalid() || isSubmitted}
            sx={{ mt: 3, mb: 2 }}
          >
            {isSubmitted ? '🚀 Sending...' : 'Sign Up'}
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/">
                {"Already have an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5, mb: 4 }} />
    </Container>
  )
}

export default Signup
