import { Typography, Box, Paper, Grid, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TodayIcon from "@mui/icons-material/Today";
import { styles } from "../doctorStyle/DoctorDashboard.styles";

const DoctorDashboard = () => {
  // يمكن استخدام هذه البيانات من API أو Redux store
  const dashboardData = {
    doctor: {
      name: "Dr. John",
      title: "Cardiologist"
    },
    stats: [
      {
        id: 1,
        title: "Upcoming Appointments",
        value: 5,
        icon: AccessTimeIcon,
        action: "View All",
        theme: "appointments"
      },
      {
        id: 2,
        title: "Total Patients",
        value: 12,
        icon: PeopleAltIcon,
        action: "Manage",
        theme: "patients"
      },
      {
        id: 3,
        title: "Today's Appointments",
        value: 3,
        icon: TodayIcon,
        action: "Check Schedule",
        theme: "today"
      }
    ]
  };

  const renderCard = (stat) => {
    const Icon = stat.icon;
    const theme = styles.themes[stat.theme];

    return (
      <Grid item xs={12} md={4} key={stat.id}>
        <Paper elevation={3} sx={styles.card(theme)}>
          <Box sx={styles.cardHeader}>
            <Icon fontSize="large" />
            <Typography variant="h6" sx={styles.cardTitle}>
              {stat.title}
            </Typography>
          </Box>
          <Typography variant="h3" sx={styles.cardValue}>
            {stat.value}
          </Typography>
          <Button 
            variant="contained" 
            sx={styles.cardButton(theme.color)}
          >
            {stat.action}
          </Button>
        </Paper>
      </Grid>
    );
  };

  return (
    <Box sx={styles.mainContainer}>
      <Typography variant="h4" gutterBottom sx={styles.welcomeText}>
        Welcome, {dashboardData.doctor.name}
      </Typography>
      
      <Grid container spacing={3} sx={styles.gridContainer}>
        {dashboardData.stats.map(renderCard)}
      </Grid>
    </Box>
  );
};

export default DoctorDashboard;