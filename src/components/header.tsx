import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { User } from '../types';

interface HeaderProps {
  user: User;
  currentPage: 'search' | 'profile';
  onNavigate: (page: 'search' | 'profile') => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, currentPage, onNavigate, onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dog Shelter Search
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            color="inherit" 
            onClick={() => onNavigate('search')}
            sx={{ 
              backgroundColor: currentPage === 'search' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
            }}
          >
            Search
          </Button>
          <Button 
            color="inherit" 
            onClick={() => onNavigate('profile')}
            sx={{ 
              backgroundColor: currentPage === 'profile' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
            }}
          >
            Profile
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {user.name}
            </Typography>
          </Box>
          <Button color="inherit" onClick={onLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;