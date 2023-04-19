import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

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

export default function OrderItems ({product}) {
    const calSubtotal = product => {
        return product.price * product.qty
    }    
    const VNCurrencyFormatter = new Intl.NumberFormat('vi', {
        style: "currency",
        currency: "VND"
    })  

    return (
        <div className='shadowedBox secondLayerBox'>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container item xs={12} spacing={1}>
              <Grid item>
                  <img src={product.image} style={imgStyle} alt="product" />
              </Grid>
              <Grid container item xs>
                <Grid item xs={12} sm={7}>
                    <div>
                        <div style={bookTitleStyle}>
                            {product.name}
                        </div>
                        <div>Số lượng: {product.qty}</div>
                        <div>Giá: {VNCurrencyFormatter.format(product.price)}</div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <div style={subtotalStyle}>{VNCurrencyFormatter.format(calSubtotal(product))}</div>
                </Grid>
              </Grid>      
          </Grid>
        </Box>  
        </div>
    )
}