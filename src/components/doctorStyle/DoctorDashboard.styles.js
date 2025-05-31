export const styles = {
  mainContainer: {
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
    p: 3
  },
  welcomeText: {
    fontWeight: "bold",
    color: "#2e3b4a"
  },
  gridContainer: {
    mt: 2
  },
  card: (theme) => ({
    p: 3,
    borderRadius: "12px",
    background: theme.gradient,
    color: "white"
  }),
  cardHeader: {
    display: "flex",
    alignItems: "center",
    mb: 2
  },
  cardTitle: {
    ml: 1
  },
  cardValue: {
    fontWeight: "bold"
  },
  cardButton: (color) => ({
    mt: 2,
    backgroundColor: "white",
    color: color,
    "&:hover": {
      backgroundColor: "#f0f0f0"
    }
  }),
  themes: {
    appointments: {
      gradient: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      color: "#6a11cb"
    },
    patients: {
      gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
      color: "#11998e"
    },
    today: {
      gradient: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)",
      color: "#f12711"
    }
  }
}; 