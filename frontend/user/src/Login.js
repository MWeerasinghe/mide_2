import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import axios from "axios";
import getUserIdFromToken from "./functions/GetUserId";

const Login = ({ setUserType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => 
  {
    e.preventDefault();
    setError(null); // Reset errors
    setLoading(true); // Start loading

    try 
    {
      const response = await axios.post("http://localhost:3000/api/auth/login", { email, password }, { headers: { "Content-Type": "application/json" } });
      const { token } = response.data;
      localStorage.setItem("vajira_token", token);
      const token1 = localStorage.getItem("vajira_token");
      const id = getUserIdFromToken();
      if (!id) 
      {
        window.alert("Please login first");
        return;
      }

      const permissionData = await axios.get(`http://localhost:3000/api/user/user/${id}`, { headers: { Authorization: `Bearer ${token1}` }, });
      const data = permissionData.data.data;

      // if(data.libMemberOpen || data.libMemberStudent || data.libMemberThero || data.dhamStudent || data.libStaff) 
      if(data.dhamStudent) 
      {
        navigate("/lms"); // Navigate to user dashboard
      } 
      else if(data.dhamTeacher) 
      {
        navigate("/teacherLms"); // Navigate to employee dashboard
      } 
      else if(data.admin) 
      {
        navigate("/adminDashboard"); // Navigate to employee dashboard
      }
      else 
      {
        alert("No permissions available.");
      }
    } 
    catch (err) 
    {
      const errorMessage = err.response?.data?.message || "An error occurred...";
      setError(errorMessage); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
