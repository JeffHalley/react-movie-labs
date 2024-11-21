// SignIn.js
import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // Import Firebase auth and signIn method

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setError(''); // Clear error on successful sign-in
        // Redirect to home or another page after successful sign in
      })
      .catch((error) => {
        setError('Invalid credentials. Please try again.');
        console.log(error);
      });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Sign In
          </Typography>

          {/* Display Error Message if any */}
          {error && <Alert severity="error">{error}</Alert>}

          {/* Sign In Form */}
          <form onSubmit={signIn}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item>
                <Button fullWidth variant="contained" color="primary" type="submit">
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignIn;
