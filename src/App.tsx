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
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// styles
import './App.css'


// types
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './state/store'
import { fetchUserProfileAsync } from './state/user/userProfileSlice'

function App(): JSX.Element {
  const userProfile = useSelector((state: RootState) => state.userProfile)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchUserProfileAsync())
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={
          !userProfile.id ?
            <Login /> :
            <Landing/>
        } />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
