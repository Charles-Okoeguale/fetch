import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, ButtonBase, Avatar } from '@mui/material';
import { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({ user, currentPage, onNavigate, onLogout }) => {
  return (
    <AppBar sx={{background: '#F7F7F7', boxShadow: 'none'}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1,  fontFamily: 'Kanit', fontWeight: 900 }}>
          Dog Shelter Search
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8em' }}>
          <Button 
            color="inherit" 
            onClick={() => onNavigate('search')}
            sx={{ 
              textTransform: 'none',
              fontFamily: 'Kanit', 
              fontWeight: 500,
              fontSize: '1.2em',
              backgroundColor: currentPage === 'search' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
            }}
          >
            Home
          </Button>
         
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
           
            <ButtonBase onClick={() => onNavigate('profile')}>
            <Typography variant="body2" sx={{ mr: 2, fontFamily: 'Kanit', fontWeight: 500, fontSize: '1.5em' }}>
                Profile
            </Typography>
              <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
            </ButtonBase>
          </Box>
          <Button variant='contained' onClick={onLogout} sx={{textTransform: 'none', fontFamily: 'Kanit', fontWeight: 700, background: 'red', color: 'white'}}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;