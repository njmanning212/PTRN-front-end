// npm modules 
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'

// styles
import './App.css'


// types
import { Profile } from './types/models'
import { useSelector } from 'react-redux'
import { RootState } from './state/store'

function App(): JSX.Element {
  const [user, setUser] = useState<Profile | null>(null);
  const reduxUser = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      const currentUser = await authService.getUserProfile()
      setUser(currentUser)
    }
    getUser()
  }, []);

  const navigate = useNavigate()
  
  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  async function handleAuthEvt (): Promise<void> {
    const currentUser = await authService.getUserProfile()
    setUser(currentUser)
  }

  return (
    <>
      {/* <NavBar user={user} handleLogout={handleLogout} /> */}
      <Routes>
        <Route path="/" element={
          reduxUser.id === null ?
            <Login handleAuthEvt={handleAuthEvt} /> :
            <Landing user={user} handleLogout={handleLogout}/>
        } />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
