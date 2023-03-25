import { useState } from "react";
import { Popover } from "@mui/material";
import { styled } from '@mui/material/styles';
import { SndLayerButton } from "../button-theme/ButtonTheme";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


const CustomPopover = styled(Popover)({
    borderRadius: '15px',
    maxHeight: '300px',
});

function PopupButton({ label, highlightcolor, children }) {
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
      <SndLayerButton highlightcolor={highlightcolor} variant="contained" onClick={handleButtonClick} endIcon={<ArrowDropDownIcon />}>
        {label}
      </SndLayerButton>
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
