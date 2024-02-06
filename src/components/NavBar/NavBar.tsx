// npm modules
import { NavLink } from 'react-router-dom'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../state/store'
import { logoutUserAsync } from '../../state/user/userProfileSlice'


const NavBar = (): JSX.Element => {
  const userProfile = useSelector((state: RootState) => state.userProfile)
  const dispatch = useDispatch<AppDispatch>()

  const handleLogout = (): void => {
    dispatch(logoutUserAsync())
  }


  
  return (
    <nav>
        <ul>
          <li>Welcome, {userProfile.firstName}</li>
          <li><NavLink to="/profiles">Profiles</NavLink></li>
          <li><NavLink to="/" onClick={handleLogout}>LOG OUT</NavLink></li>
          <li><NavLink to="/auth/change-password">Change Password</NavLink></li>
        </ul>
    </nav>
  )
}

export default NavBar
