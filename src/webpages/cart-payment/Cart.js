import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { RedButton } from '../button-theme/ButtonTheme';
import Stack from '@mui/material/Stack';
import CartItem from './CartItem';
import EmptyCart from './img/emptyCart.png'
import {getLocalCartContent, decreaseInLocalCart, increaseInLocalCart, removeFromLocalCart} from './setCartLocal';

export default function Cart () {
    const [cartContent, setCartContent] = useState(getLocalCartContent())

    const onIncrease = (obj) => {
        const exist = cartContent.find((x) => x.id === obj.id);
        if (exist) {
          setCartContent(
            cartContent.map((x) =>
              x.id === obj.id ? { ...exist, qty: exist.qty + 1 } : x
            )
          );
        } else {
          setCartContent([...cartContent, { ...obj, qty: 1 }])
        }
        increaseInLocalCart(obj)
        console.log(getLocalCartContent())
    }
    const onDecrease = (obj) => {
        const exist = cartContent.find((x) => x.id === obj.id);
        if (exist.qty === 1) {
          setCartContent(cartContent.filter((x) => x.id !== obj.id));
        } else {
          setCartContent(
            cartContent.map((x) =>
              x.id === obj.id ? { ...exist, qty: exist.qty - 1 } : x
            )
          );
        }
        decreaseInLocalCart(obj)
        console.log(getLocalCartContent())
    };    
    const onDelete = (obj) => {
        setCartContent(cartContent.filter((x) => x.id !== obj.id));
        removeFromLocalCart(obj)
        console.log(getLocalCartContent())
    };
    const subtotal = cartContent.reduce((acc, product) => acc + product.qty * product.price, 0)
    const deliveryCost = 15000
    const total = subtotal + deliveryCost
    const VNCurrencyFormatter = new Intl.NumberFormat('vi', {
      style: "currency",
      currency: "VND"
    })
    const navigate = useNavigate();
    const goToPayment = () => navigate('payment');    

    return (
        <>
        {cartContent.length !== 0 && (
        <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className='pageTitle'>Giỏ hàng của bạn</div>
          </Grid>            
          <Grid item sm={12} md={8}>
            <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
            {cartContent.map((obj, index) => (
              <CartItem key={index} obj={obj} onIncrease={onIncrease} onDecrease={onDecrease} onDelete={onDelete}/>
            ))}
            </Stack>
            </Box>
          </Grid>
          <Grid container item sm={12} md={4}>
          <Box sx={{ width: '100%' }}>
            <Stack>
                <div className='shadowedBox secondLayerBox spaceBelow'>
                    Thành tiền: {VNCurrencyFormatter.format(subtotal)}<br/>
                    Phí vận chuyển: {VNCurrencyFormatter.format(deliveryCost)}<br/>
                    <strong>Tổng tiền: {VNCurrencyFormatter.format(total)}</strong>
                </div>
                <div style={{margin:'auto'}}>
                  <RedButton variant="contained" onClick={goToPayment}> 
                      Thanh toán
                  </RedButton>
                </div>
            </Stack>
          </Box>        
          </Grid>
        </Grid>
        </Box>
        )}
        {cartContent.length === 0 && (
        <div>
          <img src={EmptyCart} style={{display:"block",width:"30%",margin:"auto"}} alt='Empty cart'/>
          <div style={{fontWeight:'bold',textAlign:'center'}}>Giỏ hàng trống</div>
        </div>
        )}
        </>
    )
}