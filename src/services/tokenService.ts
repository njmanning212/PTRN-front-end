// npm modules
import jwt_decode, { JwtPayload } from 'jwt-decode'

// types
import { User } from '../types/models'

interface Payload extends JwtPayload {
  userProfileId: number
}

function setToken(token: string): void {
  localStorage.setItem('token', token)
}

function getToken(): string | null {
  let token = localStorage.getItem('token')
  if (!token) return null
  
  const payload: Payload = jwt_decode(token)
  
  if (payload.exp && payload.exp < Date.now() / 1000) {
    localStorage.removeItem('token')
    token = null
  }
  
  return token
}

function getUserFromToken(): number | null {
  const token = getToken()
  token ? console.log(jwt_decode<Payload>(token)) : null;
  
  return token ? jwt_decode<Payload>(token).userProfileId : null
}

function removeToken(): void {
  localStorage.removeItem('token')
}

export { setToken, getToken, getUserFromToken, removeToken }
