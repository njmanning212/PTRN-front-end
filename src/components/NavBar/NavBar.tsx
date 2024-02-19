
//MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';
import NotificationsIcon from '@mui/icons-material/Notifications';

//components
import SearchBar from '../SearchBar/SearchBar';
import AccountMenu from '../AccountMenu/AccountMenu';
import NavMenu from '../NavMenu/NavMenu';


export default function NavBar() {

  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block'}, mr: 1}}
          >
            PTRN
          </Typography>
          <NavMenu />
          <Box sx={{ flexGrow: 1 }} />
          <SearchBar/>
          <Box sx={{ display: 'flex' }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <ErrorIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <AccountMenu />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}