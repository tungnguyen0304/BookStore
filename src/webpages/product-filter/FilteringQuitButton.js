import React from 'react';
import { Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';

const CustomButton = styled(Button)({
    borderRadius: '15px',
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    color: "#11224E",
    backgroundColor: 'rgb(240, 193, 186)',
    "&:hover": {
        backgroundColor: "rgb(240, 193, 186)",
    },    
    height: '35px',
    textTransform: "none"
});

export default function FilteringQuitButton ({label, onClick}) {
    return (
        <CustomButton variant="contained" onClick={onClick} endIcon={<CloseIcon />}>
            {label}
        </CustomButton>
    )
}