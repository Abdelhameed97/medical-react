import React, { useEffect, useState } from "react";
import { 
  Box, TextField, Typography, Button, Paper,
  Avatar, Divider, InputAdornment, Modal, Backdrop, Fade
} from "@mui/material";
import axios from "axios";
import {
  Person, Email, Phone, MedicalServices,
  Description, CheckCircle
} from "@mui/icons-material";

const DoctorProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    bio: ""
  });
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const doctorId = 1;

  useEffect(() => {
    axios.get(`http://localhost:5000/doctors/${doctorId}`).then(res => {
      setProfile(res.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:5000/doctors/${doctorId}`, profile)
      .then(() => {
        setOpenSuccessModal(true);
      })
      .catch(() => alert("Error updating profile"));
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
  };

  return (
    <Box p={3} sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      {/* Success Modal */}
      <Modal
        open={openSuccessModal}
        onClose={handleCloseSuccessModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openSuccessModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <CheckCircle sx={{ 
              color: '#4CAF50', 
              fontSize: '60px',
              mb: 2
            }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Success
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              You have successfully updated your profile.
            </Typography>
            <Button
              variant="contained"
              onClick={handleCloseSuccessModal}
              sx={{
                backgroundColor: '#4a90e2',
                '&:hover': {
                  backgroundColor: '#3a80d2'
                }
              }}
            >
              Continue
            </Button>
          </Box>
        </Fade>
      </Modal>

      <Typography variant="h4" gutterBottom sx={{ 
        fontWeight: 'bold',
        color: '#2e3b4a',
        mb: 3
      }}>
        Doctor Profile
      </Typography>
      
      <Paper elevation={3} sx={{ 
        p: 4,
        borderRadius: '16px',
        maxWidth: '800px',
        mx: 'auto',
        backgroundColor: 'white'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Avatar
            src="/doctor-avatar.jpg"
            sx={{
              width: 120,
              height: 120,
              border: '3px solid #4a90e2'
            }}
          />
        </Box>
        
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={profile.name}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="Specialty"
          name="specialty"
          value={profile.specialty}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MedicalServices color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="Bio"
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Description color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '8px',
              backgroundColor: '#4a90e2',
              '&:hover': {
                backgroundColor: '#3a80d2'
              }
            }}
          >
            Save Profile
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DoctorProfile;