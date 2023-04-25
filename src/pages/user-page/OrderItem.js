import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

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
    const VNCurrencyFormatter = new Intl.NumberFormat('vi', {
        style: "currency",
        currency: "VND"
    })  

    return (
        <div className='shadowedBox secondLayerBox spaceBelow'>
        
        <Box sx={{ flexGrow: 1 }}>
          <Grid container item xs={12} spacing={1}>
              <Grid item>
                <Link to={"/product/" + product.unique_name}>
                  <img src={product.image} style={imgStyle} alt="product" />
                </Link>
              </Grid>
              <Grid container item xs>
                <Grid item>
                    <div>
                        <div style={bookTitleStyle}>
                            {product.name}
                        </div>
                        <div>Số lượng: {product.qty}</div>
                        <div style={subtotalStyle}>{VNCurrencyFormatter.format(product.subtotal)}</div>
                    </div>
                </Grid>
              </Grid>      
          </Grid>
        </Box>  
        </div>
    )
}