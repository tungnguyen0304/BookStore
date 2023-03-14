import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

export default function RedButton(props) {
  const {text, theme} = props

  return (
    <ThemeProvider theme={theme}>
      <Button color="neutral" variant="contained">
        {text}
      </Button>
    </ThemeProvider>
  );
}