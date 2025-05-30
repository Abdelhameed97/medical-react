import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CalendarToday, Chat, Home, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PatientAppBar = ({ drawerWidth, onDrawerToggle, onSidebarToggle }) => {
  const [value, setValue] = React.useState(3);
  const navigate = useNavigate();

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        transition: "all 0.3s ease",
        bgcolor: "#e0f7f5", // Match background color with bottom nav
        boxShadow: 3,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", position: "relative" }}>
        {/* Left: Avatar and Toggle buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ bgcolor: "primary.main", color: "#fff" }}>P</Avatar>

          <IconButton
            sx={{ color: "primary.main" }}
            edge='start'
            onClick={onDrawerToggle}
          ></IconButton>

          <IconButton
            sx={{
              color: "primary.main",
              display: { xs: "none", sm: "inline-flex" },
            }}
            edge='start'
            onClick={onSidebarToggle}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* Center: Navigation Icons with spacing */}
        <Box
          sx={{ display: "flex", gap: 8, position: "absolute", left: "10%" }}
        >
          <IconButton
            sx={{ color: "primary.main" }}
            onClick={() => navigate("/home")}
          >
            <Home />
          </IconButton>
          <IconButton
            sx={{ color: "primary.main" }}
            onClick={() => navigate("/messages")}
          >
            <Chat />
          </IconButton>
          <IconButton
            sx={{ color: "primary.main" }}
            onClick={() => navigate("/calendar")}
          >
            <CalendarToday />
          </IconButton>
          <IconButton
            sx={{ color: "primary.main" }}
            onClick={() => navigate("/profile")}
          >
            <Person />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default PatientAppBar;
