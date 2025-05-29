import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
} from "@mui/material";

const Doctor_Details = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/doctors/${doctorId}`
        );
        setDoctor(res.data);
      } catch (err) {
        console.error("Failed to fetch doctor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  if (loading) {
    return (
      <Box textAlign='center' mt={5}>
        <CircularProgress />
        <Typography>Loading doctor details...</Typography>
      </Box>
    );
  }

  if (!doctor) {
    return (
      <Box textAlign='center' mt={5}>
        <Typography variant='h6' color='error'>
          Doctor not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Card sx={{ maxWidth: 600, margin: "0 auto" }}>
        <CardContent>
          <Box display='flex' alignItems='center' mb={2}>
            <Avatar
              src={doctor.image}
              alt={doctor.fullName}
              sx={{ width: 80, height: 80, mr: 2 }}
            />
            <Box>
              <Typography variant='h5'>{doctor.fullName}</Typography>
              <Typography color='text.secondary'>{doctor.specialty}</Typography>
            </Box>
          </Box>

          <Typography variant='body1' gutterBottom>
            <strong>Email:</strong> {doctor.email}
          </Typography>
          <Typography variant='body1' gutterBottom>
            <strong>Phone:</strong> {doctor.phone}
          </Typography>
          <Typography variant='body1'>
            <strong>Bio:</strong> {doctor.bio}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Doctor_Details;
