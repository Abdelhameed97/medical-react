import { Typography, Box, Paper, Grid, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TodayIcon from "@mui/icons-material/Today";

const DoctorDashboard = () => {
  return (
    <Box p={3} sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#2e3b4a" }}>
      
        {/* Welcome, {doctor.name} */}
        
        Welcome, Dr. John
      </Typography>
      
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ 
            p: 3, 
            borderRadius: "12px",
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            color: "white"
          }}>
            <Box display="flex" alignItems="center" mb={2}>
              <AccessTimeIcon fontSize="large" />
              <Typography variant="h6" ml={1}>Upcoming Appointments</Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>5</Typography>
            <Button 
              variant="contained" 
              sx={{ 
                mt: 2, 
                backgroundColor: "white", 
                color: "#6a11cb",
                "&:hover": { backgroundColor: "#f0f0f0" }
              }}
            >
              View All
            </Button>
          </Paper>
        </Grid>

        {/* بطاقة المرضى */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ 
            p: 3, 
            borderRadius: "12px",
            background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
            color: "white"
          }}>
            <Box display="flex" alignItems="center" mb={2}>
              <PeopleAltIcon fontSize="large" />
              <Typography variant="h6" ml={1}>Total Patients</Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>12</Typography>
            <Button 
              variant="contained" 
              sx={{ 
                mt: 2, 
                backgroundColor: "white", 
                color: "#11998e",
                "&:hover": { backgroundColor: "#f0f0f0" }
              }}
            >
              Manage
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ 
            p: 3, 
            borderRadius: "12px",
            background: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)",
            color: "white"
          }}>
            <Box display="flex" alignItems="center" mb={2}>
              <TodayIcon fontSize="large" />
              <Typography variant="h6" ml={1}>Today's Appointments</Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>3</Typography>
            <Button 
              variant="contained" 
              sx={{ 
                mt: 2, 
                backgroundColor: "white", 
                color: "#f12711",
                "&:hover": { backgroundColor: "#f0f0f0" }
              }}
            >
              Check Schedule
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorDashboard;