import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  People as PeopleIcon,
  MedicalServices as DoctorsIcon,
  Healing as SpecialtiesIcon,
  Event as AppointmentsIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const AdminSidebar = ({ drawerWidth = 240, mobileOpen, onDrawerToggle }) => {
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
    { text: "Doctors", icon: <DoctorsIcon />, path: "/admin/doctors" },
    { text: "Patients", icon: <PeopleIcon />, path: "/admin/patients" },
    {
      text: "Specialties",
      icon: <SpecialtiesIcon />,
      path: "/admin/specialties",
    },
    {
      text: "Appointments",
      icon: <AppointmentsIcon />,
      path: "/admin/appointments",
    },
  ];

  const drawer = (
    <>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          color="primary"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          Medics
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
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
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
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

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default AdminSidebar;
