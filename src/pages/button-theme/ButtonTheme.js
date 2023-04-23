import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';

const GreenButton = styled(Button) (({theme, highlightcolor}) => ({
  border: highlightcolor ? "1px solid " + highlightcolor : "none",
  borderRadius: '15px',
  margin: '5px',
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  color: highlightcolor ? highlightcolor : "#F2F4F4",
  backgroundColor: '#3B6727',
  "&:hover": {
      backgroundColor: "#3B6727",
  },    
  textTransform: "none"    
}))
const RedButton = styled(Button) (({theme, highlightcolor}) => ({
  border: highlightcolor ? "1px solid " + highlightcolor : "none",
  borderRadius: '15px',
  margin: '5px',
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  color: highlightcolor ? highlightcolor : "#F2F4F4",
  backgroundColor: '#DC7684',
  "&:hover": {
      backgroundColor: "#DC7684",
  },    
  textTransform: "none"    
}))

const SndLayerButton = styled(Button) (({theme, highlightcolor}) => ({
  border: highlightcolor ? "1px solid " + highlightcolor : "none",
  borderRadius: '15px',
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  color: highlightcolor ? highlightcolor : "#11224E",
  backgroundColor: '#F2F4F4',
  "&:hover": {
      backgroundColor: "#F2F4F4",
  },    
  height: '35px',
  textTransform: "none"    
}))

export { GreenButton, RedButton, SndLayerButton};