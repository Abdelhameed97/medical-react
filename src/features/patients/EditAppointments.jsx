import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const getNext7Days = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    dates.push({
      dateObj: d,
      dayName: daysOfWeek[d.getDay()],
      dateString: d.toISOString().split("T")[0], // yyyy-mm-dd
    });
  }
  return dates;
};

const EditAppointment = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState(null);
  const [doctor, setDoctor] = useState(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch appointment and doctor info on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Load appointment data
        const apptRes = await axios.get(
          `http://localhost:5000/appointments/${appointmentId}`
        );
        setAppointment(apptRes.data);

        // 2. Load doctor data for that appointment
        const doctorRes = await axios.get(
          `http://localhost:5000/doctors/${apptRes.data.doctorId}`
        );
        setDoctor(doctorRes.data);

        // 3. Pre-fill selectedDate and selectedTime from appointment date
        const apptDate = new Date(apptRes.data.date);
        setSelectedDate(apptDate.toISOString().split("T")[0]); // yyyy-mm-dd
        setSelectedTime(
          apptDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        );

        setLoading(false);
      } catch (err) {
        setError("Failed to load appointment or doctor data.");
        setLoading(false);
      }
    };
    fetchData();
  }, [appointmentId]);

  if (loading) {
    return (
      <Box p={3} textAlign='center'>
        <CircularProgress />
        <Typography>Loading appointment...</Typography>
      </Box>
    );
  }

  if (!appointment || !doctor) {
    return (
      <Box p={3}>
        <Typography color='error'>
          Appointment or doctor information not found.
        </Typography>
      </Box>
    );
  }

  if (!doctor.availability) {
    return (
      <Box p={3}>
        <Typography color='error'>Doctor availability not found.</Typography>
      </Box>
    );
  }

  const next7Days = getNext7Days();

  // Filter dates that doctor is available (defensive check)
  const availableDates = next7Days.filter(
    (day) => doctor?.availability?.[day.dayName]?.length > 0
  );

  const selectedDayName = next7Days.find(
    (d) => d.dateString === selectedDate
  )?.dayName;

  const availableTimes =
    selectedDate && selectedDayName && doctor?.availability?.[selectedDayName]
      ? doctor.availability[selectedDayName]
      : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!selectedDate) {
      setError("Please select a date.");
      return;
    }
    if (!selectedTime) {
      setError("Please select a time.");
      return;
    }

    try {
      // Parse time like "14:30" or "02:30"
      const [hourStr, minuteStr] = selectedTime.split(":");
      const [year, month, day] = selectedDate.split("-");

      const updatedDate = new Date(
        year,
        Number(month) - 1,
        day,
        Number(hourStr),
        Number(minuteStr)
      );

      await axios.put(`http://localhost:5000/appointments/${appointmentId}`, {
        ...appointment,
        date: updatedDate.toISOString(),
      });

      setSuccess(true);

      // Redirect back after short delay
      setTimeout(() => {
        navigate("/my-appointments");
      }, 1500);
    } catch (err) {
      setError("Failed to update appointment. Please try again.");
    }
  };

  return (
    <Box p={3}>
      <Typography variant='h4' gutterBottom>
        Edit Appointment with Dr. {doctor.fullName || doctor.name}
      </Typography>
      <Typography variant='subtitle1' gutterBottom color='text.secondary'>
        Specialty: {doctor.specialty}
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin='normal' variant='outlined'>
              <InputLabel id='date-label'>Select Date</InputLabel>
              <Select
                labelId='date-label'
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime("");
                  setError("");
                  setSuccess(false);
                }}
                label='Select Date'
              >
                {availableDates.length === 0 ? (
                  <MenuItem disabled>No available dates</MenuItem>
                ) : (
                  availableDates.map((day) => (
                    <MenuItem key={day.dateString} value={day.dateString}>
                      {day.dayName} — {day.dateString}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              margin='normal'
              variant='outlined'
              disabled={!selectedDate}
            >
              <InputLabel id='time-label'>Select Time</InputLabel>
              <Select
                labelId='time-label'
                value={selectedTime}
                onChange={(e) => {
                  setSelectedTime(e.target.value);
                  setError("");
                  setSuccess(false);
                }}
                label='Select Time'
              >
                {availableTimes.length === 0 ? (
                  <MenuItem disabled>No available time slots</MenuItem>
                ) : (
                  availableTimes.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>

            {error && (
              <Alert severity='error' sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity='success' sx={{ mt: 2 }}>
                Appointment successfully updated!
              </Alert>
            )}

            <Box mt={3}>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={!selectedDate || !selectedTime}
              >
                Save Changes
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditAppointment;
