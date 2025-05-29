import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Paper,
  Divider,
} from "@mui/material";

const staticUsers = [
  {
    id: 1,
    title: "Dr. Ahmed Mohamed",
    overview: "Experienced cardiologist with over 10 years in the field.",
    poster_path: "/img1.jpg",
  },
  {
    id: 2,
    title: "Sara Ibrahim",
    overview: "Patient with history of hypertension and diabetes.",
    poster_path: "/img2.jpg",
  },
  {
    id: 3,
    title: "Dr. Nour Ali",
    overview: "Neurologist specialized in pediatric cases.",
    poster_path: "/img3.jpg",
  },
];

const DoctorsPage = () => {
  const { id } = useParams();
  const user = staticUsers.find((u) => u.id === Number(id));

  if (!user) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography variant="h5" color="error">
          User not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Box display="flex" alignItems="center" gap={3}>
          <Avatar
            src={`https://image.tmdb.org/t/p/w500${user.poster_path}`}
            sx={{ width: 100, height: 100 }}
          />
          <Box>
            <Typography variant="h5">{user.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {user.id}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body1">{user.overview}</Typography>
      </Paper>
    </Container>
  );
};

export default DoctorsPage;
