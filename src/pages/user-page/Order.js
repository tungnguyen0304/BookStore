import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import OrderItems from './OrderItem';


export default function Order () {
    const [orderGeneralInfo, setOrderGeneralInfo] = useState({})
    const [order, setOrder] = useState([])
    useEffect(() => {
      const queryParameters = new URLSearchParams(window.location.search)
      const orderID = queryParameters.get('id')
      axios.get('http://localhost/api/user-orders-list.php')
      .then(response => {
        return response.data
      })
      .then(response => {
        for (const order of response) {
          if (order.ID == orderID) {
            setOrderGeneralInfo(order)
          }
        }
      }) 
      .catch(error => {
        if (error.response.status === 404) {
            setOrderGeneralInfo({})
        }
      });
      axios.get('http://localhost/api/user-order-content.php', {
        params: {
          id: orderID
        }
      })
      .then(response => {
        return response.data
      })
      .then(response => {
        setOrder(response)
      }) 
      .catch(error => {
        if (error.response.status === 404) {
            setOrderGeneralInfo([])
        }
      });      
    }, [])    
    const orderStatus = orderGeneralInfo.status === 1? "Đã nhận hàng": "Đang giao hàng"
    const orderStatusStyle = orderGeneralInfo.status === 0 ? {color: '#3B6727'} : {color: '#AC9518'}
    const VNCurrencyFormatter = new Intl.NumberFormat('vi', {
      style: "currency",
      currency: "VND"
    })    

    return (
        <>
        <div className='container'>
        <div className='m-3'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className='h3'>Đơn hàng</div>
          </Grid>      
          {Object.keys(orderGeneralInfo).length !== 0 ? (
          <>
          <Grid item xs={12}>
            <strong>Mã số đơn hàng: </strong>{orderGeneralInfo.ID}<br/>
            <strong>Người đặt hàng: </strong>{orderGeneralInfo.name}<br/>
            <strong>Số điện thoại: </strong>{orderGeneralInfo.phone}<br/>
            <strong>Địa chỉ nhận hàng: </strong>{orderGeneralInfo.address}<br/>
            <strong>Ngày đặt hàng: </strong>{orderGeneralInfo.order_datetime}<br/>
            <strong>Trạng thái đơn hàng: </strong><span style={orderStatusStyle}>{orderStatus}</span>
          </Grid>                      
          <Grid item sm={12} md={8}>
            <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
            {order.map((product) => (
              <OrderItems key={product.ID} product={product}/>
            ))}
            </Stack>
            </Box>
          </Grid>
          <Grid container item sm={12} md={4}>
          <Box sx={{ width: '100%' }}>
            <div className='shadowedBox secondLayerBox spaceBelow'>
                Thành tiền: {VNCurrencyFormatter.format(orderGeneralInfo.total - orderGeneralInfo.delivery_cost)}<br/>
                Phí vận chuyển: {VNCurrencyFormatter.format(orderGeneralInfo.delivery_cost)}<br/>
                <strong>Tổng tiền: {VNCurrencyFormatter.format(orderGeneralInfo.total)}</strong>
            </div>
          </Box>        
          </Grid>
          </>
          ) : (
            <div className='text-center lead'>Đơn hàng không tồn tại</div>
          )}
        </Grid>
        </div>
        </div>
        </>
    )
}