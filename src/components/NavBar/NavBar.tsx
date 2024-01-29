// npm modules
import { NavLink } from 'react-router-dom'

// types
import { Profile } from '../../types/models'

interface NavBarProps {
  user: Profile | null;
  handleLogout: () => void;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props
  
  return (
    <nav>
      {user ?
        <ul>
          <li>Welcome, {user.firstName}</li>
          <li><NavLink to="/profiles">Profiles</NavLink></li>
          <li><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></li>
          <li><NavLink to="/auth/change-password">Change Password</NavLink></li>
        </ul>
      :
        <ul>
          <li><NavLink to="/auth/signup">Sign Up</NavLink></li>
        </ul>
      }
    </nav>
  )
}

export default NavBar
