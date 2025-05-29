import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const mockDoctors = [
  {
    id: "1",
    name: "Dr. Amina Khaled",
    specialty: "Cardiology",
    bio: "Cardiologist with 10 years of experience in treating heart conditions.",
    email: "amina.khaled@example.com",
    availability: {
      Monday: ["09:00 AM", "11:00 AM"],
      Tuesday: ["01:00 PM", "03:00 PM"],
      Wednesday: [],
      Thursday: ["10:00 AM"],
      Friday: ["02:00 PM", "04:00 PM"],
    },
  },
  {
    id: "2",
    name: "Dr. Omar Tarek",
    specialty: "Dermatology",
    bio: "Expert in skincare and dermatological treatments.",
    email: "omar.tarek@example.com",
    availability: {
      Monday: ["11:00 AM"],
      Tuesday: ["09:00 AM", "12:00 PM"],
      Wednesday: ["03:00 PM"],
      Thursday: [],
      Friday: ["10:00 AM"],
    },
  },
];

const Doctor_Details = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const doctor = mockDoctors.find((doc) => doc.id === doctorId);

  if (!doctor) {
    return (
      <Box p={3}>
        <Typography variant='h6' color='error'>
          Doctor not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Card>
        <CardContent>
          <Typography variant='h4' gutterBottom>
            {doctor.name}
          </Typography>
          <Typography variant='h6' color='primary'>
            {doctor.specialty}
          </Typography>
          <Typography variant='body1' mt={2}>
            {doctor.bio}
          </Typography>
          <Typography variant='body2' color='text.secondary' mt={1}>
            Contact: {doctor.email}
          </Typography>
        </CardContent>
      </Card>

      <Box mt={4}>
        <Typography variant='h5' gutterBottom>
          Availability
        </Typography>
        <Card>
          <CardContent>
            <List>
              {Object.entries(doctor.availability).map(([day, times]) => (
                <React.Fragment key={day}>
                  <ListItem>
                    <ListItemText
                      primary={day}
                      secondary={
                        times.length > 0 ? times.join(", ") : "Not Available"
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>

      <Box mt={3}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate(`/patient/book-appointment/${doctor.id}`)}
        >
          Book Appointment
        </Button>
      </Box>
    </Box>
  );
};

export default Doctor_Details;
