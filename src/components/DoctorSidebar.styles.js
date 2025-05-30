// DoctorSidebar.styles.js
import { styled } from "@mui/material";
import { ListItem, ListItemText } from "@mui/material";

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&.MuiListItem-root': {
    padding: '8px 16px',
    margin: '4px 0',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#3e4d5e',
      '& .MuiListItemIcon-root': {
        color: '#4a90e2'
      }
    },
    '&.Mui-selected': {
      backgroundColor: '#3e4d5e',
      borderLeft: '4px solid #4a90e2'
    }
  }
}));

export const WhiteLinkText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    color: 'white !important',
    '&:hover': {
      color: 'white !important'
    }
  }
}));

export const drawerStyle = {
  width: 280,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 280,
    boxSizing: "border-box",
    borderRight: "none",
    backgroundColor: "#2e3b4a",
    color: "white",
    display: "flex",
    flexDirection: "column"
  },
};

export const avatarStyle = {
  width: 90,
  height: 90,
  margin: "0 auto 12px",
  border: "3px solid #4a90e2",
  boxShadow: '0 0 10px rgba(74, 144, 226, 0.5)'
};

export const dividerStyle = {
  backgroundColor: "#3e4d5e"
};
