import { React } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import OrderItems from './OrderItem';


export default function Order () {
    // const paramString = "...."
    // const orderID = "GET from param string"
    const orderGeneralInfo = {
        id: "1",
        phone: '0909090909',
        name: 'Nguyen Van A',
        address: '1, My Phuoc Tan Van, Thu Dau Mot, Binh Duong',
        datetime: "12/03/2023",
        deliveryCost: 15000,
        total: 1230000,
        status: 1
    }
    // retrieve from server
    const order = [
        {orderID: "1", productID: "1", title: "Bộ sách giáo khoa tiếng Việt", price: 1240000, img: "https://metaisach.com/wp-content/uploads/2019/01/sach-giao-khoa-tieng-viet-lop-1.jpg", qty: "5"},
        {orderID: "1", productID: "2", title: "Giáo trình hóa đại cương", price: 123000, img: "https://salt.tikicdn.com/ts/product/3a/72/6c/2e7381dc117829350956af598b77523d.jpg", qty: "6"},
    ]
    const orderStatus = orderGeneralInfo.status === 0 ? 'Đã hoàn thành' : "Chưa nhận hàng"
    const orderStatusStyle = orderGeneralInfo.status === 0 ? {color: '#3B6727'} : {color: '#AC9518'}
    const VNCurrencyFormatter = new Intl.NumberFormat('vi', {
      style: "currency",
      currency: "VND"
    })    

    return (
        <>
        <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className='pageTitle'>Đơn hàng</div>
          </Grid>      
          <Grid item xs={12}>
            <strong>Mã số đơn hàng: {orderGeneralInfo.id}</strong><br/>
            <strong>Ngày đặt hàng: {orderGeneralInfo.name}</strong><br/>
            <strong>Số điện thoại: {orderGeneralInfo.phone}</strong><br/>
            <strong>Địa chỉ nhận hàng: {orderGeneralInfo.address}</strong><br/>
            <strong>Ngày đặt hàng: {orderGeneralInfo.datetime}</strong><br/>
            <strong>Trạng thái đơn hàng: <span style={orderStatusStyle}>{orderStatus}</span></strong>
          </Grid>                      
          <Grid item sm={12} md={8}>
            <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
            {order.map((product, index) => (
              <OrderItems key={index} product={product}/>
            ))}
            </Stack>
            </Box>
          </Grid>
          <Grid container item sm={12} md={4}>
          <Box sx={{ width: '100%' }}>
            <div className='shadowedBox secondLayerBox spaceBelow'>
                Thành tiền: {VNCurrencyFormatter.format(orderGeneralInfo.total - orderGeneralInfo.deliveryCost)}<br/>
                Phí vận chuyển: {VNCurrencyFormatter.format(orderGeneralInfo.deliveryCost)}<br/>
                <strong>Tổng tiền: {VNCurrencyFormatter.format(orderGeneralInfo.total)}</strong>
            </div>
          </Box>        
          </Grid>
        </Grid>
        </Box>
        </>
    )
}