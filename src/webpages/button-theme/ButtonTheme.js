import { createTheme } from "@mui/material";
const greenButtonTheme = createTheme({
  palette: {
    neutral: {
      main: '#3B6727',
      contrastText: '#F2F4F4',
    },
  },
});
const redButtonTheme = createTheme({
  palette: {
    neutral: {
      main: '#DC7684',
      contrastText: '#F2F4F4',
    },
  },
});

export { greenButtonTheme, redButtonTheme };