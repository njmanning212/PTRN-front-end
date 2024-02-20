import { useNavigate } from 'react-router-dom';


//MUI
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

const ClinicList = () => {

  const navigate = useNavigate();

  return (
    <div className=' bg-white p-2'>
      <Stack direction="row" spacing={2} ml={1}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{
            borderColor: 'var(--soft-blue)',
            bgcolor: 'var(--light-gray)',
            color: 'var(--soft-blue)',
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: 'var(--soft-blue)',
              color: 'white',
              fontWeight: 'bold'
            }
          }}
          onClick={() => console.log('Add Clinic')}
        >
          Add Clinic
        </Button>
      </Stack>

    </div>
  )
}

export default ClinicList;