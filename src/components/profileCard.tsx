import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, TextField, Grid } from '@mui/material';

interface ProfileCardProps {
    user: {
      name: string;
      email: string;
    };
    onUpdateProfile: (updatedUser: { name: string; email: string }) => void;
  }

  const ProfileCard: React.FC<ProfileCardProps> = ({ user, onUpdateProfile }) => {
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
  
    const handleUpdateProfile = () => {
      onUpdateProfile({ name, email });
      setIsEditingProfile(false);
    };
  
    return (
      <Card sx={{ mb: 4, boxShadow: 'none', height: '13em' }}>
        <CardContent>
          {isEditingProfile ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder='Enter your new name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder='Enter your new email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            </Grid>
          ) : (
            <>
              <Typography variant="h6" style={{fontFamily: 'Kanit'}}>Name: {user.name}</Typography>
              <Typography variant="body1" style={{fontFamily: 'Kanit'}}>Email: {user.email}</Typography>
            </>
          )}
        </CardContent>
        <CardActions>
          {isEditingProfile ? (
            <Button onClick={handleUpdateProfile} variant="contained" color="primary" sx={{textTransform: 'none', fontFamily: 'Kanit'}}>
              Save Changes
            </Button>
          ) : (
             <Button onClick={() => setIsEditingProfile(true)} variant="outlined" sx={{textTransform: 'none', fontFamily: 'Kanit', fontWeight: 700}}>
              Edit Profile
            </Button>      
          )}
        </CardActions>
      </Card>
    );
  };
  

export default ProfileCard;
