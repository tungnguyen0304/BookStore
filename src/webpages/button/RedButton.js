import { createTheme } from '@mui/material/styles';
import AbstractButton from './AbstractButton'

const theme = createTheme({
  palette: {
    neutral: {
      main: '#DC7684',
      contrastText: '#F2F4F4',
    },
  },
});

export default function RedButton(props) {
  return (
    <AbstractButton text={props.text} theme={theme}/>
  );
}