import ScrollToTop from "react-scroll-to-top"
import UpArrow from './img/UpArrow.png'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';

const styles = {
  backgroundColor: "none",
  boxShadow: 'none',
  // border: "1px solid #ccc",
  // borderRadius: "50%",
  // color: "#333",
  cursor: "pointer",
  fontSize: "24px",
  height: "40px",
  outline: "none",
  position: "fixed",
  right: "20px",
  bottom: "20px",
  textAlign: "center",
  width: "40px",
  background: "none"
};

export default function ScrollTopButton() {

  return (
    <ScrollToTop
      smooth
      style={styles}
      color="red"
      component={
        // <Fab size="medium" color="primary" aria-label="add">
          <img src={UpArrow} alt="scroll to top" width="40px"/>
        // </Fab>   
      }
      // style={{
      //   background: 'none'
      // }}   
    />
  )
}