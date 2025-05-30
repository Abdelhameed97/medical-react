import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { NavLink } from "react-router-dom";
import {
  MedicalServices as DoctorsIcon,
  Event as AppointmentsIcon,
  People as PeopleIcon,
} from "@mui/icons-material";

const PatientSidebar = ({
  drawerWidth = 240,
  mobileOpen,
  onDrawerToggle,
  isVisible,
}) => {
  const menuItems = [
    { text: "Doctors", icon: <DoctorsIcon />, path: "/patient" },
    // {
    //   text: "Book Appointment",
    //   icon: <AppointmentsIcon />,
    //   path: "/patient/confirm-appointment",
    // },
    {
      text: "My Appointments",
      icon: <AppointmentsIcon />,
      path: `/patient/my-appointments`,
    },
    { text: "Profile", icon: <PeopleIcon />, path: "/patient/profile" },
  ];
  const drawer = (
    <>
      <Toolbar>
        <Typography
          variant='h6'
          noWrap
          component='div'
          color='primary'
          sx={{ fontWeight: "bold" }}
        >
          Medics
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button='true'
            key={item.text}
            component={NavLink}
            to={item.path}
            sx={{
              color: "text.primary",
              "&.active": {
                bgcolor: "primary.main",
                color: "primary.contrastText",
                fontWeight: "bold",
                "& .MuiListItemIcon-root": {
                  color: "primary.contrastText",
                },
                borderRadius: 1,
              },
              "&:hover": {
                bgcolor: "primary.light",
                color: "primary.contrastText",
                "& .MuiListItemIcon-root": {
                  color: "primary.contrastText",
                },
                borderRadius: 1,
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box
      component='nav'
      sx={{ width: { sm: isVisible ? drawerWidth : 0 }, flexShrink: 0 }}
    >
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {isVisible && (
        <Drawer
          variant='permanent'
          open
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};

export default PatientSidebar;
