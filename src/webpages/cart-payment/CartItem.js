import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const imgStyle = {
    margin: 'auto',
    display: 'block',    
    maxWidth: '100%',
    minWidth: '100%',
    width: '100px',
}
const bookTitleStyle = { 
    fontSize: "20px", 
    fontWeight: "bold" 
}
const subtotalStyle = {
    color: '#C0203D',
    fontWeight: "bold",
}

export default function CartItem (props) {
    const onIncrease = props.onIncrease
    const onDecrease = props.onDecrease
    const onDelete = props.onDelete
    const calSubtotal = obj => {
        return obj.price * obj.qty
    }
    const VNCurrencyFormatter = new Intl.NumberFormat('vi', {
        style: "currency",
        currency: "VND"
    })    

    return (
        <>
      <div className='shadowedBox secondLayerBox'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container item xs={12} spacing={1}>
            <Grid item>
                <img src={props.obj.img} style={imgStyle} alt="product" />
            </Grid>
            <Grid container item xs alignItems="center">
                <Grid container item xs={11}>
                    <Grid item xs={12} sm={5}>
                        <div style={bookTitleStyle}>
                            {props.obj.title}
                        </div>
                        <div>Giá: {VNCurrencyFormatter.format(props.obj.price)}</div>
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton aria-label="Remove button" size="small" onClick={() => onDecrease(props.obj)}>
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                        <span>{props.obj.qty}</span>
                        <IconButton aria-label="Add button" size="small" onClick={() => onIncrease(props.obj)}>
                            <AddCircleOutlineIcon />
                        </IconButton>          
                    </Grid>
                    <Grid item xs={12} sm={4} display={{ xs: "none", sm: "block" }} sx={{ display: 'flex', alignItems: 'center' }}>
                        <div style={subtotalStyle}>{VNCurrencyFormatter.format(calSubtotal(props.obj))}</div>
                    </Grid>
                </Grid>
                <Grid item xs={1}>
                    <IconButton aria-label="Delete button" onClick={() => onDelete(props.obj)}> 
                        <DeleteIcon />
                    </IconButton>
                </Grid>  
            </Grid>      
        </Grid>
      </Box>  
      </div>
      </>
    )
}