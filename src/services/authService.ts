// services
import * as tokenService from './tokenService'
import * as profileService from './profileService'
import { addPhoto as addProfilePhoto } from './profileService'

// types
import { 
  ChangePasswordFormData,
  LoginFormData,
  SignupFormData,
  PhotoFormData
} from '../types/forms'
import { Profile } from '../types/models'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth`

async function signup(
  signupFormData: SignupFormData, 
  photoData: PhotoFormData,
): Promise<string | void> {
  
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signupFormData),
  })

  if (!res.ok) {
    try {
      const errorResponse = await res.json()
      return `Signup failed: ${errorResponse.error}`
    } catch (error) {
      throw new Error(`Signup failed: ${res.status}`)
    }
  }

  const json = await res.json()
  
  if (json.token) {
    tokenService.setToken(json.token)

    if (photoData.photo) {
      await addProfilePhoto(photoData)
    }
  }
}

async function getUserProfile(): Promise<Profile | null> {
  const userProfileId = tokenService.getUserProfileIdFromToken()
  if (!userProfileId) return null
  return await profileService.getProfile(userProfileId)
}

function logout(): void {
  tokenService.removeToken()
}

async function login(loginFormData: LoginFormData): Promise<string | void> {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginFormData),
  })

  if (!res.ok) {
    try {
      const errorResponse = await res.json()
      return `Login failed: ${errorResponse.error}`
    } catch (error) {
      throw new Error(`Login failed: ${res.status}`)
    }
  }

  const json = await res.json()

  if (json.token) tokenService.setToken(json.token)
}

async function changePassword(
  changePasswordFormData: ChangePasswordFormData
): Promise<void> {
  const res = await fetch(`${BASE_URL}/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenService.getToken()}`,
    },
    body: JSON.stringify(changePasswordFormData),
  })
  const json = await res.json()

  if (json.err) throw new Error(json.err)

  if (json.token) {
    tokenService.removeToken()
    tokenService.setToken(json.token)
  }
}

export { signup, getUserProfile, logout, login, changePassword }
