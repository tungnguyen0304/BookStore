import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { formatPrice } from '../Utils';

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
    return (
        <div className='shadowedBox secondLayerBox'>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container item xs={12} spacing={1}>
              <Grid item>
                  <img src={product.img} style={imgStyle} alt="product" />
              </Grid>
              <Grid container item xs>
                <Grid item xs={12} sm={7}>
                    <div>
                        <div style={bookTitleStyle}>
                            {product.title}
                        </div>
                        <div>Số lượng: {product.qty}</div>
                        <div>Giá: {formatPrice(product.price)} VNĐ</div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <div style={subtotalStyle}>{formatPrice(calSubtotal(product))} VNĐ</div>
                </Grid>
              </Grid>      
          </Grid>
        </Box>  
        </div>
    )
}