import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';

// Mock data for appointments & doctors
const mockDoctors = {
  '1': { id: '1', name: 'Dr. Amina Khaled', specialty: 'Cardiology' },
  '2': { id: '2', name: 'Dr. Omar Tarek', specialty: 'Dermatology' }
};

// Utility to get next 7 days with day names
const getNext7Days = () => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    dates.push({
      dateObj: d,
      dayName: daysOfWeek[d.getDay()],
      dateString: d.toISOString().split('T')[0]
    });
  }
  return dates;
};

const MyAppointments = () => {
  // Initial mock appointments
  const [appointments, setAppointments] = useState([
    {
      id: 'a1',
      doctorId: '1',
      date: '2025-06-01',
      time: '09:00 AM',
      status: 'confirmed'
    },
    {
      id: 'a2',
      doctorId: '2',
      date: '2025-06-03',
      time: '12:00 PM',
      status: 'pending'
    }
  ]);

  // Dialog & form state
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [alert, setAlert] = useState({ message: '', severity: '' });

  // Get doctor's availability (mock)
  const getDoctorAvailability = (doctorId) => {
    if (doctorId === '1') {
      return {
        Monday: ['09:00 AM', '11:00 AM'],
        Tuesday: ['01:00 PM', '03:00 PM'],
        Thursday: ['10:00 AM'],
        Friday: ['02:00 PM', '04:00 PM']
      };
    } else if (doctorId === '2') {
      return {
        Monday: ['11:00 AM'],
        Tuesday: ['09:00 AM', '12:00 PM'],
        Wednesday: ['03:00 PM'],
        Friday: ['10:00 AM']
      };
    }
    return {};
  };

  const next7Days = getNext7Days();

  // Handle Cancel
  const handleCancel = (id) => {
    setAppointments((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: 'cancelled' } : app
      )
    );
    setAlert({ message: 'Appointment cancelled.', severity: 'info' });
  };

  // Open Reschedule Dialog
  const handleOpenReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setNewDate('');
    setNewTime('');
    setAlert({ message: '', severity: '' });
    setOpenDialog(true);
  };

  // Close Dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAppointment(null);
    setAlert({ message: '', severity: '' });
  };

  // Submit Reschedule
  const handleReschedule = () => {
    if (!newDate) {
      setAlert({ message: 'Please select a new date.', severity: 'error' });
      return;
    }
    if (!newTime) {
      setAlert({ message: 'Please select a new time.', severity: 'error' });
      return;
    }

    setAppointments((prev) =>
      prev.map((app) =>
        app.id === selectedAppointment.id
          ? { ...app, date: newDate, time: newTime, status: 'confirmed' }
          : app
      )
    );
    setAlert({ message: 'Appointment rescheduled.', severity: 'success' });
    setTimeout(() => {
      handleCloseDialog();
    }, 1500);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        My Appointments
      </Typography>

      {alert.message && (
        <Alert
          severity={alert.severity}
          onClose={() => setAlert({ message: '', severity: '' })}
          sx={{ mb: 2 }}
        >
          {alert.message}
        </Alert>
      )}

      <Grid container spacing={2}>
        {appointments.length === 0 && (
          <Typography>No appointments found.</Typography>
        )}

        {appointments.map((app) => {
          const doctor = mockDoctors[app.doctorId] || {};
          return (
            <Grid item xs={12} md={6} key={app.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{doctor.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Specialty: {doctor.specialty}
                  </Typography>
                  <Typography>
                    Date: {app.date} at {app.time}
                  </Typography>
                  <Typography>Status: {app.status}</Typography>

                  <Box mt={2} display="flex" gap={1}>
                    {app.status !== 'cancelled' && (
                      <>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleCancel(app.id)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleOpenReschedule(app)}
                        >
                          Reschedule
                        </Button>
                      </>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Reschedule Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Reschedule Appointment</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="new-date-label">New Date</InputLabel>
            <Select
              labelId="new-date-label"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              label="New Date"
            >
              {next7Days.map((day) => (
                <MenuItem key={day.dateString} value={day.dateString}>
                  {day.dayName} — {day.dateString}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            disabled={!newDate}
          >
            <InputLabel id="new-time-label">New Time</InputLabel>
            <Select
              labelId="new-time-label"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              label="New Time"
            >
              {newDate &&
                selectedAppointment &&
                (() => {
                  const dayName = next7Days.find(
                    (d) => d.dateString === newDate
                  )?.dayName;
                  const availability = getDoctorAvailability(
                    selectedAppointment.doctorId
                  );
                  return availability[dayName]?.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ));
                })()}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleReschedule}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyAppointments;
