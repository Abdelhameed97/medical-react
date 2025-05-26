// import {
//     Drawer,
//     List,
//     ListItem,
//     ListItemIcon,
//     ListItemText,
//     Divider,
//     Avatar,
//     Box,
//     Typography
// } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import SettingsIcon from "@mui/icons-material/Settings";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import EventIcon from '@mui/icons-material/Event';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import PersonIcon from '@mui/icons-material/Person';



// const DoctorSidebar = ({ onSelect }) => {
//     return (
//         <Drawer
//             variant="permanent"
//             anchor="left"
//             sx={{
//                 width: 350,
//                 flexShrink: 0,
//                 "& .MuiDrawer-paper": {
//                     width: 350,
//                     boxSizing: "border-box",
//                     borderRight: "none",
//                     backgroundColor: "#2e3b4a",
//                     color: "white"
//                 },
//             }}
//         >
//             <Box p={2} textAlign="center">
//                 <Avatar
//                     alt="Doctor"
//                     src="/doctor-avatar.jpg"
//                     sx={{
//                         width: 80,
//                         height: 80,
//                         margin: "0 auto 10px",
//                         border: "3px solid #4a90e2"
//                     }}
//                 />
//                 <Typography variant="h6">Dr/Rehab</Typography>
//                 <Typography variant="caption">Cardiologist</Typography>
//             </Box>

//             <Divider sx={{ backgroundColor: "#3e4d5e" }} />

//             <List>
//                 <ListItem button onClick={() => onSelect("dashboard")} sx={{ py: 1.5 }}>
//                     <ListItemIcon sx={{ color: "white" }}><DashboardIcon /></ListItemIcon>
//                     <ListItemText primary="Dashboard" />
//                 </ListItem>

//                 <ListItem button onClick={() => onSelect("appointments")} sx={{ py: 1.5 }}>
//                     <ListItemIcon sx={{ color: "white" }}><CalendarTodayIcon /></ListItemIcon>
//                     <ListItemText primary="Appointments" />
//                 </ListItem>

//                 {/* <ListItem button onClick={() => onSelect("patients")} sx={{ py: 1.5 }}>
//                     <ListItemIcon sx={{ color: "white" }}><PersonOutlineIcon /></ListItemIcon>
//                     <ListItemText primary="Patients" />
//                 </ListItem> */}

//                 {/* <ListItem button onClick={() => onSelect("settings")} sx={{ py: 1.5 }}>
//                     <ListItemIcon sx={{ color: "white" }}><SettingsIcon /></ListItemIcon>
//                     <ListItemText primary="Settings" />
//                 </ListItem> */}

//                 <ListItem button onClick={() => onSelect("profile")} sx={{ py: 1.5 }}>
//                     <ListItemIcon sx={{ color: "white" }}><PersonIcon /></ListItemIcon>
//                     <ListItemText primary="Profile" />
//                 </ListItem>


//                 <ListItem button onClick={() => onSelect("availability")} sx={{ py: 1.5 }}>
//                     <ListItemIcon sx={{ color: "white" }}  ><AccessTimeIcon /></ListItemIcon>
//                     <ListItemText primary="Availability" />
//                 </ListItem>
//             </List>


//             <Box sx={{ marginTop: "auto", p: 2 }}>
//                 <Divider sx={{ backgroundColor: "#3e4d5e", mb: 2 }} />
//                 <ListItem button sx={{ py: 1.5 }}>
//                     <ListItemIcon sx={{ color: "white" }}><ExitToAppIcon /></ListItemIcon>
//                     <ListItemText primary="Logout" />
//                 </ListItem>
//             </Box>
//         </Drawer>
//     );
// };

// export default DoctorSidebar;
import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Box,
  Typography
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  CalendarToday as CalendarTodayIcon,
  Person as PersonIcon,
  AccessTime as AccessTimeIcon,
  ExitToApp as ExitToAppIcon
} from "@mui/icons-material";

const DoctorSidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 350,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 350,
          boxSizing: "border-box",
          borderRight: "none",
          backgroundColor: "#2e3b4a",
          color: "white"
        },
      }}
    >
      <Box p={2} textAlign="center">
        <Avatar
          alt="Doctor"
          src="/doctor-avatar.jpg"
          sx={{
            width: 80,
            height: 80,
            margin: "0 auto 10px",
            border: "3px solidrgb(6, 38, 75)"
          }}
        />
        <Typography variant="h6">Dr/Rehab</Typography>
        <Typography variant="caption">Cardiologist</Typography>
      </Box>

      <Divider sx={{ backgroundColor: "#3e4d5e" }} />

      <List>
        <ListItem 
          button 
          component={Link} 
          to="/doctor/dashboard" 
          sx={{ py: 1.5, "&:hover": { backgroundColor: "#3e4d5e" } }}
        >
          <ListItemIcon sx={{ color: "white" }}><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/doctor/appointments" 
          sx={{ py: 1.5, "&:hover": { backgroundColor: "#3e4d5e" } }}
        >
          <ListItemIcon sx={{ color: "white" }}><CalendarTodayIcon /></ListItemIcon>
          <ListItemText primary="Appointments" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/doctor/profile" 
          sx={{ py: 1.5, "&:hover": { backgroundColor: "#3e4d5e" } }}
        >
          <ListItemIcon sx={{ color: "white" }}><PersonIcon /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/doctor/availability" 
          sx={{ py: 1.5, "&:hover": { backgroundColor: "#3e4d5e" } }}
        >
          <ListItemIcon sx={{ color: "white" }}><AccessTimeIcon /></ListItemIcon>
          <ListItemText primary="Availability" />
        </ListItem>
      </List>

      <Box sx={{ marginTop: "auto", p: 2 }}>
        <Divider sx={{ backgroundColor: "#3e4d5e", mb: 2 }} />
        <ListItem 
          button 
          sx={{ 
            py: 1.5, 
            "&:hover": { backgroundColor: "#3e4d5e" }
          }}
        >
          <ListItemIcon sx={{ color: "white" }}><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default DoctorSidebar;