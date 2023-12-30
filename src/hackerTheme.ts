import { createTheme } from "@mui/material/styles";

const hackerTheme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontFamily: "Orbitron, sans-serif",
    }
  },
  palette: {
    primary: {
      light: "#4A90E2", // Light blue
      main: "#0066CC", // Blue
      dark: "#003366", // Dark blue
      contrastText: "#FFFFFF", // White text on blue
    },
    secondary: {
      light: "#FF9F7D", // Light orange
      main: "#FF5722", // Orange
      dark: "#BF360C", // Dark orange
      contrastText: "#FFFFFF", // White text on orange
    },
    background: {
      default: "#1A1A1A", // Dark background
      paper: "#F0F0F0", // Light paper background
    },
    text: {
      primary: "#FFFFFF", // White text
      secondary: "#CCCCCC", // Light gray text
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        contained: {
          backgroundColor: "#0066CC", // Blue background for buttons
          "&:hover": {
            backgroundColor: "#4A90E2", // Light blue on hover
          },
        },
      },
    },
  },
});

export default hackerTheme;
