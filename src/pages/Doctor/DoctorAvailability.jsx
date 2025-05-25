import React, { useEffect, useState } from "react";
import {
  Box, Typography, FormGroup, FormControlLabel, Checkbox,
  TextField, Button, Grid, Paper, Divider, Chip, Stack,
  Modal, Backdrop, Fade
} from "@mui/material";
import axios from "axios";
import {
  Schedule, CheckCircle, AccessTime, 
  Alarm, CalendarToday, WatchLater
} from "@mui/icons-material";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const DoctorAvailability = () => {
  const [selectedDays, setSelectedDays] = useState({});
  const [availability, setAvailability] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/availability?doctorId=1").then(res => {
      setAvailability(res.data);
      const initDays = {};
      res.data.forEach(item => {
        initDays[item.day] = {
          start: item.startTime,
          end: item.endTime
        };
      });
      setSelectedDays(initDays);
    });
  }, []);

  const handleCheckbox = (day) => {
    setSelectedDays(prev => {
      const updated = { ...prev };
      if (updated[day]) {
        delete updated[day];
      } else {
        updated[day] = { start: "09:00", end: "17:00" };
      }
      return updated;
    });
  };

  const handleTimeChange = (day, type, value) => {
    setSelectedDays(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value
      }
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    axios.get("http://localhost:5000/availability?doctorId=1").then(res => {
      const deletes = res.data.map(item => 
        axios.delete(`http://localhost:5000/availability/${item.id}`)
      );
      
      Promise.all(deletes).then(() => {
        const posts = Object.entries(selectedDays).map(([day, times]) =>
          axios.post("http://localhost:5000/availability", {
            doctorId: 1,
            day,
            startTime: times.start,
            endTime: times.end
          })
        );
        
       Promise.all(posts)
  .then(() => {
    axios.get("http://localhost:5000/availability?doctorId=1").then(res => {
      setAvailability(res.data); 
      setIsSaving(false);
      setOpenSuccessModal(true);
    });
  })

          .catch(() => {
            setIsSaving(false);
            alert("Error saving availability");
          });
      });
    });
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
  };

  return (
    <Box p={3} sx={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
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
                Availability saved successfully
              {/* You have successfully reset your password. */}
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
        color: '#1e293b',
        mb: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <Schedule fontSize="large" />
        Set Your Availability
      </Typography>
      
      <Paper elevation={3} sx={{ 
        p: 4, 
        borderRadius: '12px',
        background: 'white'
      }}>
        <Typography variant="h6" mb={3} sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: '#3b82f6'
        }}>
          <CalendarToday />
          Select Working Days
        </Typography>
        
        <Divider sx={{ mb: 3 }} />
        
        <FormGroup>
          <Grid container spacing={3}>
            {days.map(day => (
              <Grid item xs={12} md={6} key={day}>
                <Paper elevation={1} sx={{ 
                  p: 2,
                  borderRadius: '8px',
                  borderLeft: `4px solid ${selectedDays[day] ? '#10b981' : '#e2e8f0'}`
                }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedDays[day] !== undefined}
                        onChange={() => handleCheckbox(day)}
                        color="primary"
                        icon={<AccessTime />}
                        checkedIcon={<CheckCircle />}
                      />
                    }
                    label={
                      <Typography variant="subtitle1" fontWeight="600">
                        {day}
                      </Typography>
                    }
                    sx={{ mb: selectedDays[day] ? 2 : 0 }}
                  />
                  
                  {selectedDays[day] && (
                    <Box mt={1} pl={4}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" display="block" color="text.secondary">
                            Start Time
                          </Typography>
                          <TextField
                            type="time"
                            value={selectedDays[day].start}
                            onChange={(e) => handleTimeChange(day, "start", e.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ step: 300 }} // 5 min intervals
                            size="small"
                          />
                        </Box>
                        
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" display="block" color="text.secondary">
                            End Time
                          </Typography>
                          <TextField
                            type="time"
                            value={selectedDays[day].end}
                            onChange={(e) => handleTimeChange(day, "end", e.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ step: 300 }} // 5 min intervals
                            size="small"
                          />
                        </Box>
                      </Stack>
                    </Box>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </FormGroup>
        
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button 
            variant="contained" 
            onClick={handleSave}
            disabled={isSaving}
            startIcon={<Alarm />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            {isSaving ? "Saving..." : "Save Availability"}
          </Button>
        </Box>
      </Paper>
      
      {availability.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" mb={2} sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <WatchLater />
            Current Availability
          </Typography>
          <Stack direction="row" spacing={2}>
            {availability.map(item => (
              <Chip
                key={item.day}
                label={`${item.day}: ${item.startTime} - ${item.endTime}`}
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default DoctorAvailability;