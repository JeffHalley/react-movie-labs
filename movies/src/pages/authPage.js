// AuthPage.js
import React from 'react';
import { Grid, Paper } from '@mui/material';
import SignIn from '../components/auth/signIn';
import SignUp from '../components/auth/signUp';

const AuthPage = () => {
  return (
    <Grid container justifyContent="center" alignItems="flex-start" spacing={4} sx={{ minHeight: '100vh' }}>
      {/* Sign In Section */}
      <Grid item xs={12} sm={5}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <SignIn />
        </Paper>
      </Grid>

      {/* Sign Up Section */}
      <Grid item xs={12} sm={5}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <SignUp />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AuthPage;
