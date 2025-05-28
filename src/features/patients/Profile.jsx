import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert
} from '@mui/material';

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
];

// Mock initial profile data
const initialProfile = {
  fullName: 'Abdelhameed Mohamed Hemida',
  email: 'abdelhameed@example.com',
  phone: '+201234567890',
  gender: 'male',
  dob: '1990-01-01'
};

const Profile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (e) => {
    setProfile({ ...profile, [field]: e.target.value });
    setError('');
    setSuccess(false);
  };

  const validate = () => {
    if (!profile.fullName.trim()) return 'Full name is required.';
    if (!profile.email.trim()) return 'Email is required.';
    // Basic email regex
    if (!/\S+@\S+\.\S+/.test(profile.email)) return 'Email is invalid.';
    if (!profile.phone.trim()) return 'Phone is required.';
    if (!profile.dob) return 'Date of birth is required.';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    // TODO: Replace with API call to update profile
    console.log('Profile saved:', profile);
    setSuccess(true);
  };

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Profile updated successfully!
        </Alert>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Full Name"
          value={profile.fullName}
          onChange={handleChange('fullName')}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Email"
          type="email"
          value={profile.email}
          onChange={handleChange('email')}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Phone"
          value={profile.phone}
          onChange={handleChange('phone')}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          select
          label="Gender"
          value={profile.gender}
          onChange={handleChange('gender')}
          fullWidth
          margin="normal"
        >
          {genders.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Date of Birth"
          type="date"
          value={profile.dob}
          onChange={handleChange('dob')}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          required
        />

        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Save Profile
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Profile;
