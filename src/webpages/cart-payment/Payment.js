import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import OrderItems from '../user-page/OrderItem';
import { GreenButton } from '../button-theme/ButtonTheme';
import { getLocalCartContent } from './setCartLocal';
import { checkValidName, checkValidPhoneNumber } from '../FormUtil';

export default function Payment () {
    // user info fetched from server
    const [info, setInfo] = useState({
        name: '',
        phone: '',
        address: '',
        method: ''
    });
    // fecth user info
    useEffect(() => {
    axios.get('http://localhost/api/user-info.php')
    .then(response => {
        return response.data
    })
    .then(response => {
        setInfo(prev => ({
            ...prev,
            name: response.name,
            phone: response.phone,
            address: response.address,
        }))
    }) 
    .catch(error => {
        console.log(error);
    });    
    }, [])      
    const [errors, setErrors] = useState(info);   
    const methods = [
        {value: '0', text: 'Thanh toán khi nhận hàng'},
        {value: '1', text: 'Thanh toán trực tuyến'},
    ] 
    const checkValueInList = (value, list) => {
        if (!value)
          return false 
    
        for (const item of list) {
          if (item.value == value) {
            return true
          }
        }
    
        return false
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prevState) => ({ ...prevState, [name]: value }));
        // if there is any warning, turn it off
        if (errors[name]) {
            errors[name] = ''
        }
    };    
  
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const trimmedInfo = Object.fromEntries(Object.entries(info).map(([key, value]) => [key, value.trim()]))
        const errors = {};
        if (!checkValidName(trimmedInfo.name))
            errors.name = "Tên không được trống và ít hơn 50 ký tự bao gồm các ký tự Việt Nam và khoảng trắng"
        if (!checkValidPhoneNumber(trimmedInfo.phone)) 
            errors.phone = "SĐT không hợp lệ"
    
        if (!trimmedInfo.address) 
            errors.address = "Vui lòng điền địa chỉ nhận hàng"
        else if (trimmedInfo.address.length > 255) 
            errors.address = "Địa chỉ tối đa 255 ký tự"

        if (!trimmedInfo.method) 
            errors.method = "Vui lòng chọn phương thức thanh toán";
        else if (!checkValueInList(trimmedInfo.method, methods))
            errors.method = "Phương thức thanh toán không hợp lệ"

    
        // Set errors if any, otherwise submit form
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        } else {
            // submit to server
            const compactCartContent = cartContent.map(item => ({productID: item.ID, qty: item.qty}))
            const order = {...info, orderContent: compactCartContent}
            console.log(order)
            axios.post('http://localhost/api/order.php', order)
            .then(response => {
                console.log(response.data)
                // setData(response.data); // update the state with the response data
            })
            .catch(error => {
                console.error(error); // handle any errors that occur
            });
        }      
    }
    const cartContent = getLocalCartContent()
    const subtotal = cartContent.reduce((acc, product) => acc + product.qty * product.price, 0)
    const deliveryCost = 15000
    const total = subtotal + deliveryCost    
    const VNCurrencyFormatter = new Intl.NumberFormat('vi', {
        style: "currency",
        currency: "VND"
    })

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
                        <FormControl fullWidth >
                        <TextField
                            label="Tên người nhận hàng"
                            name="name"
                            value={info.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                        <TextField
                            label="SĐT"
                            name="phone"
                            value={info.phone}
                            onChange={handleChange}
                            error={!!errors.phone}
                            helperText={errors.phone}
                        />                        
                        </FormControl>
                    </Grid>      
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>   
                        <TextField
                            label="Địa chỉ nhận hàng"
                            name="address"
                            value={info.address}
                            onChange={handleChange}
                            error={!!errors.address}
                            helperText={errors.address}
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
                        <FormControl error={!!errors.method} variant="standard">
                            <FormLabel id="demo-error-radios">Chọn phương thức thanh toán</FormLabel>
                            <RadioGroup
                            aria-labelledby="demo-error-radios"
                            name="method"
                            value={info.method}
                            onChange={handleChange}
                            >
                                {methods.map((item, index) => (
                                    <FormControlLabel key={index} value={item.value} control={<Radio />} label={item.text}/>
                                ))}
                            </RadioGroup>
                            <FormHelperText>{errors.method}</FormHelperText>
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
                                Thành tiền: {VNCurrencyFormatter.format(subtotal)}<br/>
                                Phí vận chuyển: {VNCurrencyFormatter.format(deliveryCost)}<br/>
                                <strong>Tổng tiền: {VNCurrencyFormatter.format(total)}</strong>
                            </div>
                            <div style={{margin:'auto'}}>
                            <GreenButton type="submit" variant="contained">
                                Xác nhận thanh toán
                            </GreenButton>
                            </div>
                        </Stack>     
                        </Box>           
                        </Grid>  
                    </Grid>             
                </Grid>                                                        
            </Stack>
        </form>            
    )
}