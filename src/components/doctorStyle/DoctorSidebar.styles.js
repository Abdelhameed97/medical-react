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

export const styles = {
  drawer: {
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
    }
  },
  profileContainer: {
    p: 3,
    textAlign: "center",
    pt: 4
  },
  avatar: {
    width: 90,
    height: 90,
    margin: "0 auto 12px",
    border: "3px solid #4a90e2",
    boxShadow: '0 0 10px rgba(74, 144, 226, 0.5)'
  },
  doctorName: {
    fontWeight: 600,
    mb: 0.5,
    color: 'white'
  },
  specialty: {
    color: 'white'
  },
  divider: {
    backgroundColor: "#3e4d5e",
    my: 1
  },
  listContainer: {
    flexGrow: 1,
    px: 2
  },
  listIcon: {
    color: "white",
    minWidth: '40px'
  },
  listItemText: {
    variant: 'body1',
    sx: { fontWeight: 500 }
  },
  footerContainer: {
    p: 2,
    pt: 0
  },
  footerDivider: {
    backgroundColor: "#3e4d5e",
    mb: 2
  }
}; 