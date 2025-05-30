import React from "react";
import { Container, Typography, Box, Button, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";

function MainDashboard() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
            px: { xs: 2, md: 0 },
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#2c3e50",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Welcome to HealthCare System
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#7f8c8d",
              maxWidth: "700px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Comprehensive healthcare management platform connecting doctors, patients and administrators
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {/* Doctors Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 0,
                  borderRadius: "10px",
                  background: "white",
                  color: "#2c3e50",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
              >
                <Box
                  sx={{
                    height: "180px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    alt="Doctor"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    Doctors Portal
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 3, color: "#7f8c8d", lineHeight: 1.6 }}
                  >
                    Manage your practice, appointments and patient records with our specialized tools
                  </Typography>
                  <Button
                    component={Link}
                    to="/login?role=doctor"
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: "#6a11cb",
                      color: "white",
                      "&:hover": { backgroundColor: "#5a0db3" },
                      mt: "auto",
                      px: 4,
                      py: 1.5,
                      borderRadius: "6px",
                      textTransform: "none",
                      fontSize: "1rem",
                    }}
                    startIcon={<LockIcon />}
                  >
                    Doctor Login
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Grid>

          {/* Patients Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 0,
                  borderRadius: "10px",
                  background: "white",
                  color: "#2c3e50",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
              >
                <Box
                  sx={{
                    height: "180px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    alt="Patient"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    Patients Portal
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 3, color: "#7f8c8d", lineHeight: 1.6 }}
                  >
                    Book appointments, access your medical records and communicate with doctors
                  </Typography>
                  <Button
                    component={Link}
                    to="/login?role=patient"
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: "#11998e",
                      color: "white",
                      "&:hover": { backgroundColor: "#0d857a" },
                      mt: "auto",
                      px: 4,
                      py: 1.5,
                      borderRadius: "6px",
                      textTransform: "none",
                      fontSize: "1rem",
                    }}
                    startIcon={<LockIcon />}
                  >
                    Patient Login
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Grid>

          {/* Admin Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 0,
                  borderRadius: "10px",
                  background: "white",
                  color: "#2c3e50",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
              >
                <Box
                  sx={{
                    height: "180px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    alt="Admin"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    Admin Portal
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 3, color: "#7f8c8d", lineHeight: 1.6 }}
                  >
                    Manage the entire healthcare system, users, and platform settings
                  </Typography>
                  <Button
                    component={Link}
                    to="/login?role=admin"
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: "#f12711",
                      color: "white",
                      "&:hover": { backgroundColor: "#d9210e" },
                      mt: "auto",
                      px: 4,
                      py: 1.5,
                      borderRadius: "6px",
                      textTransform: "none",
                      fontSize: "1rem",
                    }}
                    startIcon={<LockIcon />}
                  >
                    Admin Login
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default MainDashboard;