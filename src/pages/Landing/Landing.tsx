// css
import styles from './Landing.module.css'

// types
import { Profile } from '../../types/models'
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import NavBar from '../../components/NavBar/NavBar';

interface LandingProps {
  user: Profile | null;
  handleLogout: () => void;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user, handleLogout } = props
  const reduxUser = useSelector((state: RootState) => state.user)

  return (
    <>
      <NavBar handleLogout={handleLogout} user={user} />
      <main className={styles.container}>
        <h1>hello, {user ? user.firstName : 'friend'}</h1>
        {reduxUser.id === null
          ? <p>please log in</p>
          : <p>you are logged in</p>}
      </main>
    </>
  )
}

export default Landing
