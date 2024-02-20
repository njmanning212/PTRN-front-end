import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//MUI
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//List
import { NavMenuList } from './NavMenuList';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Nav Menu">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        sx={{
          mt: 1.25,
        }}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {NavMenuList.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => navigate(item.path)}
            sx={{
              bgcolor: item.bgColor,
              margin: '10px',
              borderRadius: '5px',
              '&:hover': {
                opacity: 0.8,
                bgcolor: item.bgColor
              }
            }}
          >
            <item.icon />
            <div className='ml-2 mr-7'>
              {item.title}
            </div>
            <ArrowForwardIosIcon sx={{size:'small'}}/>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}