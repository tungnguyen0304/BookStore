import ScrollToTop from "react-scroll-to-top"
import { Fab } from "@mui/material";
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';


export default function ScrollTopButton() {

  return (
    <ScrollToTop
      smooth
      color="red"
      component={
        <Fab size="medium" color="primary" aria-label="add">
          <KeyboardArrowUp />
        </Fab>   
      }
      style={{
        background: 'none'
      }}   
    />
  )
}