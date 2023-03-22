import { useState } from "react";
import { Button, Popover } from "@mui/material";
import { styled } from '@mui/material/styles';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


const CustomPopover = styled(Popover)({
    borderRadius: '15px',
    // backgroundColor: '#f5f5f5',
    maxHeight: '300px',
});
const CustomButton = styled(Button)({
    borderRadius: '15px',
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    color: "#11224E",
    backgroundColor: '#F2F4F4',
    "&:hover": {
        backgroundColor: "#F2F4F4",
    },    
    height: '35px',
    textTransform: "none"
});

function PopupButton({ label, children }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopupClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CustomButton variant="contained" onClick={handleButtonClick} endIcon={<ArrowDropDownIcon />}>
        {label}
      </CustomButton>
      <CustomPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopupClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {children}
      </CustomPopover>
    </>
  );
}

export default PopupButton;
