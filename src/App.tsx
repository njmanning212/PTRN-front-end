// npm modules 
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import ChangePassword from './pages/ChangePassword/ChangePassword'

// components
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// styles
import './App.css'


// types
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './state/store'
import { fetchUserProfileAsync } from './state/user/userProfileSlice'
import NavBar from './components/NavBar/NavBar'
import ClinicList from './pages/ClinicList/ClinicList'

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
          !userProfile.id
            ? <Login />
            : (
              <>
                <NavBar />
                {userProfile.roleValue === 500 
                  ? <ClinicList />
                  : <h1>To be Added</h1>
                }
              </>
            )
        } />
        <Route
          path="/auth/signup"
          element={<Signup />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
