import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState({});
  const [loading, setLoading] = useState(true);
  const [confirmCancelId, setConfirmCancelId] = useState(null);
  const navigate = useNavigate();

  const patientId = 1; // Replace with real user ID

  useEffect(() => {
    axios
      .get(`http://localhost:5000/appointments?patientId=${patientId}`)
      .then((res) => {
        const fetchedAppointments = res.data;
        setAppointments(fetchedAppointments);

        const doctorIds = [
          ...new Set(fetchedAppointments.map((a) => a.doctorId)),
        ];
        return Promise.all(
          doctorIds.map((id) =>
            axios.get(`http://localhost:5000/doctors/${id}`).then((res) => ({
              id,
              data: res.data,
            }))
          )
        );
      })
      .then((responses) => {
        const map = {};
        responses.forEach(({ id, data }) => {
          map[id] = data;
        });
        setDoctors(map);
      })
      .catch((err) => console.error("Error loading appointments", err))
      .finally(() => setLoading(false));
  }, []);

  const cancelAppointment = (id) => {
    axios
      .delete(`http://localhost:5000/appointments/${id}`)
      .then(() => {
        setAppointments((prev) => prev.filter((appt) => appt.id !== id));
        setConfirmCancelId(null);
      })
      .catch((err) => console.error("Error cancelling", err));
  };

  if (loading) {
    return (
      <Box p={3}>
        <CircularProgress />
        <Typography>Loading appointments...</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant='h4' gutterBottom>
        My Appointments
      </Typography>

      {appointments.length === 0 ? (
        <Typography>No appointments found.</Typography>
      ) : (
        appointments.map((appt) => {
          const doctor = doctors[appt.doctorId];
          return (
            <Paper key={appt.id} sx={{ p: 2, mb: 2 }}>
              <Typography variant='h6'>
                Doctor: {doctor ? doctor.fullName : "Unknown"}
              </Typography>
              <Typography>
                Date: {new Date(appt.date).toLocaleString()}
              </Typography>
              <Typography>Reason: {appt.reason}</Typography>
              <Typography>Status: {appt.status}</Typography>

              <Stack direction='row' spacing={2} mt={2}>
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={() => navigate(`/edit-appointment/${appt.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant='outlined'
                  color='error'
                  onClick={() => setConfirmCancelId(appt.id)}
                >
                  Cancel
                </Button>
              </Stack>
            </Paper>
          );
        })
      )}

      {/* Confirm Cancel Dialog */}
      <Dialog open={!!confirmCancelId} onClose={() => setConfirmCancelId(null)}>
        <DialogTitle>Cancel Appointment</DialogTitle>
        <DialogContent>
          Are you sure you want to cancel this appointment?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmCancelId(null)}>No</Button>
          <Button
            onClick={() => cancelAppointment(confirmCancelId)}
            color='error'
          >
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyAppointments;
