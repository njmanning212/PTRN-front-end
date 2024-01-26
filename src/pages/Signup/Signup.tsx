// npm modules
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import * as authService from '../../services/authService'

// css
import styles from './Signup.module.css'

// types
import { SignupFormData, PhotoFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'
import { AuthPageProps } from '../../types/props'

const Signup = (props: AuthPageProps): JSX.Element => {
  const { handleAuthEvt } = props
  const navigate = useNavigate()
  const imgInputRef = useRef<HTMLInputElement | null>(null)

  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [adminSignUp, setAdminSignUp] = useState(false)
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
      setIsSubmitted(true)
      await authService.signup(formData, photoData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
      setIsSubmitted(false)
    }
  }

  const isFormInvalid = () => {
    return !(firstName &&lastName && email && password && password === confirmPassword)
  }

  return (
    <main className={styles.container}>
      <h1>Sign Up</h1>
      <p className={styles.message}>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          First Name
          <input type="text" value={firstName} name="firstName" onChange={handleChange} />
        </label>
        <label className={styles.label}>
          Last Name
          <input type="text" value={lastName} name="lastName" onChange={handleChange} />
        </label>
        <label className={styles.label}>
          Email
          <input
            type="text"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Phone Number
          <input
            type="text"
            value={phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Password
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Admin Sign Up
          <input
            type="checkbox"
            checked={isAdmin}
            name="isAdmin"
            onChange={handleChange}
          /> 
        </label>
        {adminSignUp && (
          <label className={styles.label}>
            Admin Code
            <input
              type="password"
              value={adminCode}
              name="adminCode"
              onChange={handleChange}
            />
          </label>
        )}
        <label className={styles.label}>
          Upload Photo
          <input 
            type="file" 
            name="photo" 
            onChange={handleChangePhoto}
            ref={imgInputRef}
          />
        </label>
        <div>
          <Link to="/">Cancel</Link>
          <button
            className={styles.button}
            disabled={ isFormInvalid() || isSubmitted }
          >
            {!isSubmitted ? 'Sign Up' : '🚀 Sending...'}
          </button>
        </div>
      </form>
    </main>
  )
}

export default Signup
