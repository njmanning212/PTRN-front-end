// css
import styles from './Landing.module.css'

// types
import { Profile } from '../../types/models'

interface LandingProps {
  user: Profile | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  return (
    <main className={styles.container}>
      <h1>hello, {user ? user.firstName : 'friend'}</h1>
    </main>
  )
}

export default Landing
