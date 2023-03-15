import { React, useState } from 'react';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import OrderItems from '../user-page/OrderItem';
import GreenButton from '../button/GreenButton';
import { getLocalCartContent } from './setCartLocal';
import { formatPrice } from '../Utils';

export default function Payment () {
    // user info
    const [userInfo] = useState({
        name: "Nguyen Van A",
        phone: "0708990191",
        address: '1, My Phuoc Tan Van, Thu Dau Mot, Binh Duong'
    })
    const [method, setMethod] = useState('');
    const [methodError, setMethodError] = useState(false);
    const [helperText, setHelperText] = useState('');
  
    const handleRadioChange = (event) => {
      setMethod(event.target.value);
      setHelperText(' ');
      setMethodError(false);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setMethod(event.target.value);
      if (method !== '') {
        setHelperText('Vui lòng chọn phương thức thanh toán');
        setMethodError(true);
      }
    };    
    const cartContent = getLocalCartContent()
    const subtotal = cartContent.reduce((acc, product) => acc + product.qty * product.price, 0)
    const deliveryCost = 15000
    const total = subtotal + deliveryCost    
    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Grid item xs={12}>
                <div className='pageTitle'>Xác nhận mua hàng</div>
                </Grid>   
                <Grid item xs={12} className='secondLayerBox shadowedBox' style={{overflow:'hidden'}}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <strong>Thông tin nhận hàng</strong>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                        <InputLabel htmlFor="name">Tên người nhận hàng</InputLabel>
                        <OutlinedInput
                        id="name"
                        defaultValue={userInfo.name}
                        label="Name"
                        />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                        <InputLabel htmlFor="phone">SĐT</InputLabel>
                        <OutlinedInput
                        id="phone"
                        defaultValue={userInfo.phone}
                        label="Phone"
                        />
                        </FormControl>
                    </Grid>      
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                        <InputLabel htmlFor="address">Địa chỉ nhận hàng</InputLabel>
                        <OutlinedInput
                        id="address"
                        defaultValue={userInfo.address}
                        label="Address"
                        />
                        </FormControl>
                    </Grid>       
                    </Grid>                                                        
                </Grid>
                <Grid item xs={12} className='secondLayerBox shadowedBox' style={{overflow:'hidden'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <strong>Phương thức thanh toán</strong>
                        </Grid>
                        <Grid item xs={12}>
                        <FormControl error={methodError} variant="standard">
                            <FormLabel id="demo-error-radios">Chọn phương thức thanh toán</FormLabel>
                            <RadioGroup
                            aria-labelledby="demo-error-radios"
                            name="method"
                            value={method}
                            onChange={handleRadioChange}
                            >
                            <FormControlLabel value="COD" control={<Radio />} label="Thanh toán khi nhận hàng" />
                            <FormControlLabel value="Online" control={<Radio />} label="Thanh toán trực tuyến" />
                            </RadioGroup>
                            <FormHelperText>{helperText}</FormHelperText>
                        </FormControl>   
                        </Grid>    
                    </Grid>             
                </Grid>     
                <Grid item xs={12} className='secondLayerBox shadowedBox' style={{overflow:'hidden'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <strong>Kiểm tra đơn hàng</strong>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={2}>
                                {cartContent.map((product, index) => (
                                <OrderItems key={index} product={product}/>
                                ))}
                            </Stack>
                        </Grid>  
                    </Grid>             
                </Grid>         
                <Grid item xs={12} className='secondLayerBox shadowedBox' style={{overflow:'hidden'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <strong>Thanh toán</strong>
                        </Grid>
                        <Grid item xs={12}>
                        <Box sx={{ width: '100%' }}>
                        <Stack spacing={2}>
                            <div className='spaceBelow'>
                                Thành tiền: {formatPrice(subtotal)} VNĐ<br/>
                                Phí vận chuyển: {formatPrice(deliveryCost)} VNĐ<br/>
                                <strong>Tổng tiền: {formatPrice(total)} VNĐ</strong>
                            </div>
                            <div style={{margin:'auto'}}><GreenButton text="Xác nhận thanh toán"/></div>
                        </Stack>     
                        </Box>           
                        </Grid>  
                    </Grid>             
                </Grid>                                                        
            </Stack>
        </form>            
    )
}