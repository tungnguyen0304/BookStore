import { React, useState } from 'react';
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
import { greenButtonTheme } from '../button-theme/ButtonTheme';
import { ThemeProvider } from '@emotion/react';
import { Button } from '@mui/material';
import { getLocalCartContent } from './setCartLocal';
import { formatPrice } from '../Utils';

export default function Payment () {
    // user info fetched from server
    const userInfo = {
        name: "Nguyen Van A",
        phone: "0708990191",
        address: '1, My Phuoc Tan Van, Thu Dau Mot, Binh Duong'
    }
    const [values, setValues] = useState({
        name: userInfo.name,
        phone: userInfo.phone,
        address: userInfo.address,
        method: ''
    });
    const [errors, setErrors] = useState({});    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevState) => ({ ...prevState, [name]: value }));
        // if there is any warning, turn it off
        if (errors[name]) {
            errors[name] = ''
        }
    };    
  
    const handleSubmit = (event) => {
      event.preventDefault();

      const errors = {};
      if (!values.name) errors.name = "Vui lòng điền tên người nhận";
      if (!values.phone) errors.phone = "Vui lòng điền SĐT người nhận";
      if (!values.address) errors.address = "Vui lòng điền địa chỉ nhận hàng";
      if (!values.method) errors.method = "Vui lòng chọn phương thức thanh toán";
  
      // Set errors if any, else submit form
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
      } else {
        alert(values.name + " " + values.phone + " " + values.address + " " + values.method)
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
                        <FormControl fullWidth >
                        <TextField
                            label="Tên người nhận hàng"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            error={errors.name ? true : false}
                            helperText={errors.name}
                        />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                        <TextField
                            label="SĐT"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            error={errors.phone ? true : false}
                            helperText={errors.phone}
                        />                        
                        </FormControl>
                    </Grid>      
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>   
                        <TextField
                            label="Địa chỉ nhận hàng"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            error={errors.address ? true : false}
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
                        <FormControl error={errors.method} variant="standard">
                            <FormLabel id="demo-error-radios">Chọn phương thức thanh toán</FormLabel>
                            <RadioGroup
                            aria-labelledby="demo-error-radios"
                            name="method"
                            value={values.method}
                            onChange={handleChange}
                            >
                            <FormControlLabel value="COD" control={<Radio />} label="Thanh toán khi nhận hàng" />
                            <FormControlLabel value="Online" control={<Radio />} label="Thanh toán trực tuyến" />
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
                                Thành tiền: {formatPrice(subtotal)} VNĐ<br/>
                                Phí vận chuyển: {formatPrice(deliveryCost)} VNĐ<br/>
                                <strong>Tổng tiền: {formatPrice(total)} VNĐ</strong>
                            </div>
                            <div style={{margin:'auto'}}>
                            <ThemeProvider theme={greenButtonTheme}>
                            <Button type="submit" color="neutral" variant="contained">
                                Xác nhận thanh toán
                            </Button>
                            </ThemeProvider>
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