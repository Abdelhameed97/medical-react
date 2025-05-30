
// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Avatar,
//   Box,
//   Typography,
//   styled
// } from "@mui/material";
// import {
//   Dashboard as DashboardIcon,
//   CalendarToday as CalendarTodayIcon,
//   Person as PersonIcon,
//   AccessTime as AvailabilityIcon,
//   Schedule as ScheduleIcon,
//   ExitToApp as LogoutIcon
// } from "@mui/icons-material";

// const StyledListItem = styled(ListItem)(({ theme }) => ({
//   '&.MuiListItem-root': {
//     padding: '8px 16px',
//     margin: '4px 0',
//     borderRadius: '8px',
//     '&:hover': {
//       backgroundColor: '#3e4d5e',
//       '& .MuiListItemIcon-root': {
//         color: '#4a90e2'
//       }
//     },
//     '&.Mui-selected': {
//       backgroundColor: '#3e4d5e',
//       borderLeft: '4px solid #4a90e2'
//     }
//   }
// }));

// const WhiteLinkText = styled(ListItemText)(({ theme }) => ({
//   '& .MuiTypography-root': {
//     color: 'white !important',
//     '&:hover': {
//       color: 'white !important'
//     }
//   }
// }));

// const DoctorSidebar = () => {
//   return (
//     <Drawer
//       variant="permanent"
//       anchor="left"
//       sx={{
//         width: 280,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: 280,
//           boxSizing: "border-box",
//           borderRight: "none",
//           backgroundColor: "#2e3b4a",
//           color: "white",
//           display: "flex",
//           flexDirection: "column"
//         },
//       }}
//     >
//       <Box p={3} textAlign="center" sx={{ pt: 4 }}>
//         <Avatar
//           alt="Doctor"
//           src="/doctor-avatar.jpg"
//           sx={{
//             width: 90,
//             height: 90,
//             margin: "0 auto 12px",
//             border: "3px solid #4a90e2",
//             boxShadow: '0 0 10px rgba(74, 144, 226, 0.5)'
//           }}
//         />
//         <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: 'white' }}>Dr. Rehab Ali</Typography>
//         <Typography variant="caption" sx={{ color: 'white' }}>Cardiologist</Typography>
//       </Box>

//       <Divider sx={{ backgroundColor: "#3e4d5e", my: 1 }} />

//       <Box sx={{ flexGrow: 1, px: 2 }}>
//         <List>
//           {[
//             { text: "Dashboard", icon: <DashboardIcon />, path: "/doctor/dashboard" },
//             { text: "Availability", icon: <AvailabilityIcon />, path: "/doctor/availability" },

//             { text: "Appointments", icon: <CalendarTodayIcon />, path: "/doctor/appointments" },
//             { text: "Schedule", icon: <ScheduleIcon />, path: "/doctor/schedule" },
//             { text: "Profile", icon: <PersonIcon />, path: "/doctor/profile" }
//           ].map((item) => (
//             <StyledListItem
//               key={item.text}
//               button
//               component={Link}
//               to={item.path}
//             >
//               <ListItemIcon sx={{ color: "white", minWidth: '40px' }}>
//                 {item.icon}
//               </ListItemIcon>
//               <WhiteLinkText 
//                 primary={item.text} 
//                 primaryTypographyProps={{ 
//                   variant: 'body1',
//                   sx: { fontWeight: 500 } 
//                 }} 
//               />
//             </StyledListItem>
//           ))}
//         </List>
//       </Box>

//       <Box sx={{ p: 2, pt: 0 }}>
//         <Divider sx={{ backgroundColor: "#3e4d5e", mb: 2 }} />
//         <StyledListItem
//           button
//           component={Link}
//           to="/logout"
//         >
//           <ListItemIcon sx={{ color: "white", minWidth: '40px' }}>
//             <LogoutIcon />
//           </ListItemIcon>
//           <WhiteLinkText 
//             primary="Logout" 
//             primaryTypographyProps={{ 
//               variant: 'body1',
//               sx: { fontWeight: 500 } 
//             }} 
//           />
//         </StyledListItem>
//       </Box>
//     </Drawer>
//   );
// };

// export default DoctorSidebar;



// DoctorSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemIcon,
  Divider,
  Avatar,
  Box,
  Typography
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  CalendarToday as CalendarTodayIcon,
  Person as PersonIcon,
  AccessTime as AvailabilityIcon,
  Schedule as ScheduleIcon,
  ExitToApp as LogoutIcon
} from "@mui/icons-material";

// ✅ استدعاء التنسيقات المفصولة
import {
  StyledListItem,
  WhiteLinkText,
  drawerStyle,
  avatarStyle,
  dividerStyle
} from "./DoctorSidebar.styles";

const DoctorSidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={drawerStyle}
    >
      <Box p={3} textAlign="center" sx={{ pt: 4 }}>
        <Avatar
          alt="Doctor"
          src="/doctor-avatar.jpg"
          sx={avatarStyle}
        />
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: 'white' }}>Dr. Rehab Ali</Typography>
        <Typography variant="caption" sx={{ color: 'white' }}>Cardiologist</Typography>
      </Box>

      <Divider sx={{ ...dividerStyle, my: 1 }} />

      <Box sx={{ flexGrow: 1, px: 2 }}>
        <List>
          {[
            { text: "Dashboard", icon: <DashboardIcon />, path: "/doctor/dashboard" },
            { text: "Availability", icon: <AvailabilityIcon />, path: "/doctor/availability" },
            { text: "Appointments", icon: <CalendarTodayIcon />, path: "/doctor/appointments" },
            { text: "Schedule", icon: <ScheduleIcon />, path: "/doctor/schedule" },
            { text: "Profile", icon: <PersonIcon />, path: "/doctor/profile" }
          ].map((item) => (
            <StyledListItem
              key={item.text}
              button
              component={Link}
              to={item.path}
            >
              <ListItemIcon sx={{ color: "white", minWidth: '40px' }}>
                {item.icon}
              </ListItemIcon>
              <WhiteLinkText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  variant: 'body1',
                  sx: { fontWeight: 500 } 
                }} 
              />
            </StyledListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2, pt: 0 }}>
        <Divider sx={{ ...dividerStyle, mb: 2 }} />
        <StyledListItem
          button
          component={Link}
          to="/logout"
        >
          <ListItemIcon sx={{ color: "white", minWidth: '40px' }}>
            <LogoutIcon />
          </ListItemIcon>
          <WhiteLinkText 
            primary="Logout" 
            primaryTypographyProps={{ 
              variant: 'body1',
              sx: { fontWeight: 500 } 
            }} 
          />
        </StyledListItem>
      </Box>
    </Drawer>
  );
};

export default DoctorSidebar;
