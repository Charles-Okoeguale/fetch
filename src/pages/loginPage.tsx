import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, CircularProgress, colors } from '@mui/material';
import { LoginPageProps } from '../types';
import { useStyles } from './styles/loginPageStyles';

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false)
  const classes = useStyles()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
        credentials: 'include',
      });

      if (response.ok) {
        setLoading(false)
        onLogin({
            name, email
        });
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
    <Box className={classes.container}>
      <Typography component="h1" variant="h5">
        Find Your Perfect Furry Friend
      </Typography>
      <Box component="form" onSubmit={handleSubmit} className={classes.form}>
        <TextField
          margin="dense"
          required
          fullWidth
          id="name"
          placeholder='Enter your name'
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={classes.textField}
        />
        <TextField
          margin="dense"
          required
          fullWidth
          id="email"
          placeholder='Enter your email address'
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.textField}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          {loading ? <CircularProgress sx={{color: 'white'}} /> : 'Sign In'}
        </Button>
      </Box>
    </Box>
  </Container>
  );
};

export default LoginPage;