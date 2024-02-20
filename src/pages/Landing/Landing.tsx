
// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

// Components
import NavBar from '../../components/NavBar/NavBar';
import Clinics from '../../components/Clinics/Clinics';

const Landing = (): JSX.Element => {
  const userProfile = useSelector((state: RootState) => state.userProfile)

  return (
    <>
      <NavBar />
      {userProfile.roleValue < 500 
        ? <h1>Clinic</h1>
        : <Clinics />
      }

    </>
  )
}

export default Landing
