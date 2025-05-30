import React, { useState } from "react";
import { Box, Toolbar, IconButton } from "@mui/material";
import PatientAppBar from "./PatientAppBar";
import PatientSidebar from "./PatientSidebar";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

function PatientLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <PatientAppBar
        drawerWidth={sidebarOpen ? drawerWidth : 0}
        onDrawerToggle={handleDrawerToggle}
        onSidebarToggle={toggleSidebar}
      />
      <PatientSidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
        isVisible={sidebarOpen}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${sidebarOpen ? drawerWidth : 0}px)` },
          mt: 8,
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default PatientLayout;
