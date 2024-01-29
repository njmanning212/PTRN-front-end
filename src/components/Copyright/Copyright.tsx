//MUI icons/components
import Typography from '@mui/material/Typography';

interface Props {
  sx: {mt: number, mb: number}
}

const Copyright = (props: Props ) : JSX.Element => {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      Physical Therapy Right Now
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;