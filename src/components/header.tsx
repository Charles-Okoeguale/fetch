import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, ButtonBase, Avatar, useMediaQuery, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { HeaderProps } from '../types';
import MenuIcon from '@mui/icons-material/Menu';

const Header: React.FC<HeaderProps> = ({ user, currentPage, onNavigate, onLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)'); 

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Tab') return;
    setDrawerOpen(open);
  };

  const drawerList = (
    <List>
      <ListItem onClick={() => { onNavigate('search'); setDrawerOpen(false); }}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem onClick={() => { onNavigate('profile'); setDrawerOpen(false); }}>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem onClick={onLogout}>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );


  return (
    <AppBar sx={{background: '#F7F7F7', boxShadow: 'none'}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1,  fontFamily: 'Kanit', fontWeight: 900 }}>
          Dog Shelter Search
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerList}
            </Drawer>
          </>
        ) : (
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
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;