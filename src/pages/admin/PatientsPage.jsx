import React from "react";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import UserCard from "../../components/admin/UserManagement/UserCard"; // Assuming same UserCard used

const staticPatients = [
  {
    id: 4,
    title: "Sara Ibrahim",
    overview: "Patient with history of hypertension and diabetes.",
    poster_path: "/img2.jpg",
  },
  {
    id: 5,
    title: "John Doe",
    overview: "Patient with asthma and allergies.",
    poster_path: "/img4.jpg",
  },
];

const PatientsPage = () => {
  const loading = false;
  const error = null;
  const list = staticPatients;

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Patients
      </Typography>
      <Grid container spacing={4}>
        {list.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <UserCard
              id={user.id}
              img={`https://image.tmdb.org/t/p/w500${user.poster_path}`}
              title={user.title}
              desc={user.overview.substring(0, 100) + "..."}
              page={`/user/${user.id}`}
              fullUser={user}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PatientsPage;
