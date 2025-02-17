import getUserIdFromToken from '../functions/GetUserId'


import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignIn() 
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => 
  {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try 
    {
      const response = await axios.post("http://localhost:3000/api/auth/login",{ email, password },{ headers: { "Content-Type": "application/json" } });

      const { token } = response.data;
      localStorage.setItem("vajira_token", token);
      const id = getUserIdFromToken();
      if (!id) 
      {
        window.alert("Please login first");
        return;
      }

      const permissionResponse = await axios.get(`http://localhost:3000/api/user/user/${id}`,{ headers: { Authorization: `Bearer ${token}` } });

      const userData = permissionResponse.data.data;

      if (userData.dhamStudent) 
      {
        localStorage.setItem("vajira_token_student", token);
        navigate("/lms");
      } 
      else if (userData.dhamTeacher) 
      {
        localStorage.setItem("vajira_token_teacher", token);
        navigate("/teacherLms");
      } 
      else if (userData.admin) 
      {
        localStorage.setItem("vajira_token_admin", token);
        navigate("/admin");
      } 
      else 
      {
        alert("No permissions available.");
      }
    } 
    catch (err) 
    {
      const errorMessage = err.response?.data?.message || "An error occurred...";
      setError(errorMessage);
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
