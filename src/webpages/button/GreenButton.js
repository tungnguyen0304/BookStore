import { createTheme } from '@mui/material/styles';
import AbstractButton from './AbstractButton'

const theme = createTheme({
  palette: {
    neutral: {
      main: '#3B6727',
      contrastText: '#F2F4F4',
    },
  },
});

export default function GreenButton(props) {
  return (
    <AbstractButton text={props.text} theme={theme}/>
  );
}