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
      <Card sx={{ mb: 4 }}>
        <CardContent>
          {isEditingProfile ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            </Grid>
          ) : (
            <>
              <Typography variant="h6">Name: {user.name}</Typography>
              <Typography variant="body1">Email: {user.email}</Typography>
            </>
          )}
        </CardContent>
        <CardActions>
          {isEditingProfile ? (
            <Button onClick={handleUpdateProfile} variant="contained" color="primary">
              Save Changes
            </Button>
          ) : (
            <Button onClick={() => setIsEditingProfile(true)} variant="outlined">
              Edit Profile
            </Button>
          )}
        </CardActions>
      </Card>
    );
  };
  

export default ProfileCard;
