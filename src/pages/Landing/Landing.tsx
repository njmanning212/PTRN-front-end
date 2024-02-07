// css
import styles from './Landing.module.css'

// types
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import NavBar from '../../components/NavBar/NavBar';



const Landing = (): JSX.Element => {
  const userProfile = useSelector((state: RootState) => state.userProfile)

  return (
    <>
      <NavBar />
      <main className={styles.container}>
        <h1>Hello, {userProfile.firstName}</h1>
      </main>
    </>
  )
}

export default Landing
