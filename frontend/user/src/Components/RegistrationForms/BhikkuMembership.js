import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';

const BhikkuMembership = () => {
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    landline: '',
    gender: '',
    nic: '',
    dob: '',
    address: '',
    password: '',
    confirmPassword: '',
    year: currentYear,
    grade: 6,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
  
    const validateNIC = (nic) => /^\d{12}$/.test(nic); // Validates NIC: 15 digits
    const validatePhone = (phone) => /^\d{10}$/.test(phone); // Validates phone: 10 digits
  
    // Validate NIC, mobile, and landline
    if (!validateNIC(formData.nic)) {
      setError('');
      setError('NIC must be exactly 12 digits.');
      setLoading(false);
      return;
    }
  
    if (!validatePhone(formData.phone)) {
      setError('');
      setError('Mobile number must be exactly 10 digits.');
      setLoading(false);
      return;
    }
  
    if (formData.landline && !validatePhone(formData.landline)) {
      setError('');
      setError('Landline number must be exactly 10 digits.');
      setLoading(false);
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setError('');
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/formRegister',
        {
          email: formData.email,
          password: formData.password,
          landline: formData.landline,
          gender: formData.gender,
          nic: formData.nic,
          dob: formData.dob,
          address: formData.address,
          name: `${formData.firstName} ${formData.lastName}`,
          mobile: formData.phone,
          role: 'teacher',
          year: formData.year,
          grade: formData.grade,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      setError('');
      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        landline: '',
        gender: '',
        nic: '',
        dob: '',
        address: '',
        password: '',
        confirmPassword: '',
      });
    } catch (err) {
      setError('');
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Teacher Membership Registration
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            required
            margin="normal"
            id="firstName"
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            required
            margin="normal"
            id="lastName"
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            required
            margin="normal"
            id="email"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            required
            margin="normal"
            id="phone"
            label="Mobile Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            id="landline"
            label="Landline Number"
            name="landline"
            value={formData.landline}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            id="gender"
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="year-label">Select Academic Year</InputLabel>
            <Select
              labelId="year-label"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
            >
              <MenuItem value={currentYear}>{currentYear}</MenuItem>
              <MenuItem value={currentYear + 1}>{currentYear + 1}</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="grade-label">Expected Grade to Teach</InputLabel>
            <Select
              labelId="grade-label"
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
            >
              {[6, 7, 8, 9, 10, 11].map((grade) => (
                <MenuItem key={grade} value={grade}>
                  {grade}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            required
            margin="normal"
            id="nic"
            label="NIC"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            id="dob"
            label="Date of Birth"
            name="dob"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.dob}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            id="address"
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            required
            margin="normal"
            type="password"
            id="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            required
            margin="normal"
            type="password"
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success" sx={{ mt: 1 }}>
              Registration successful!
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default BhikkuMembership;