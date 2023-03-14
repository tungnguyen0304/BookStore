import { React, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import RedButton from '../button/RedButton';
import Stack from '@mui/material/Stack';
import CartItem from './CartItem';
import EmptyCart from './img/emptyCart.png'
import {getLocalCartContent, decreaseInLocalCart, increaseInLocalCart, removeFromLocalCart} from './setCartLocal';

// just for test, in reality, cart is set when user click 'add to cart' button
localStorage.setItem("cart", JSON.stringify([
  {id: 1, qty: 1, title: "Bộ sách giáo khoa tiếng Việt", price: 1240000, img: "https://metaisach.com/wp-content/uploads/2019/01/sach-giao-khoa-tieng-viet-lop-1.jpg"}, 
  {id: 2, qty: 2, title: "Giáo trình hóa đại cương", price: 123000, img: "https://salt.tikicdn.com/ts/product/3a/72/6c/2e7381dc117829350956af598b77523d.jpg"}
]))


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
    const formatPrice = price => {
      let parts = price.toString().split(".");
      parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
      return parts.join(",");
    }    

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
                    Thành tiền: {formatPrice(subtotal)} VNĐ<br/>
                    Phí vận chuyển: {formatPrice(deliveryCost)} VNĐ<br/>
                    <strong>Tổng tiền: {formatPrice(total)} VNĐ</strong>
                </div>
                <div style={{margin:'auto'}}><RedButton text="Thanh toán"/></div>
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