import { Grid, FormControl, TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { GreenButton, RedButton } from '../button-theme/ButtonTheme';
import ConfirmDialog from '../ConfirmDialog';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import {checkValidName, checkValidUsername, checkValidPass, checkValidEmail, checkValidPhoneNumber} from '../FormUtil'

// tài khoản mẫu:
// user: user Bkhoa123@
// user: user1 Bkhoa456@
// admin: admin Bkhoa456@
// user: user123 Bkhoa456@
// user: bachkhoa Bkhoa456@
// user: khmt Bkhoa456@

const Register = () => {
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    password: '',
    phone:'',
    email: '',
    address:''
  });
  const [errors, setErrors] = useState(profile);    
  
  const handleChange = (e) => {
      const { name, value } = e.target;
      setProfile((prevState) => ({ ...prevState, [name]: value }));
      // if there is any warning, turn it off
      if (errors[name]) {
          errors[name] = ''
      }
  };   


  const handleSubmit = async (e) => {
    // check thong tin truoc khi submit
    const trimmedInfo = Object.fromEntries(Object.entries(profile).map(([key, value]) => [key, value.trim()]))
    const errors = {};
    if (!checkValidName(trimmedInfo.name))
      errors.name = "Tên không được trống và ít hơn 50 ký tự bao gồm các ký tự Việt Nam và khoảng trắng"

    if (!checkValidUsername(trimmedInfo.username)) 
      errors.username = "Username gồm 3 đến 20 ký tự chữ thường, chữ hoa, số, dấu gạch chân và dấu gạch nối";
    
    if (trimmedInfo.email.length !== 0) {
      if (!checkValidEmail(trimmedInfo.email)) {
        errors.email = "Email không hợp lệ";
      } 
    }
    
    if (!checkValidPass(trimmedInfo.password))
      errors.password = "Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ hoa, 1 thường, 1 số, 1 ký tự đặc biệt"
    
    if (trimmedInfo.phone.length !== 0)
      if (!checkValidPhoneNumber(trimmedInfo.phone)) 
        errors.phone = "Phone không hợp lệ"

    if (trimmedInfo.address.length > 255) 
      errors.address = "Địa chỉ tối đa 255 ký tự"

    // Set errors if any, else submit form
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});   
    } else {
        try {
          const response = await axios.post('http://localhost/api/register.php', trimmedInfo)
          Cookies.set('role', response.data.role, { expires: 1/24 })
          window.location.href = '/'          
        } catch (error) {
          if (error.response.status === 400) { // invalid
            console.log(error.response.data)
            setErrors(error.response.data)
          } else if (error.response.status === 409) { // conflict
            console.log(error.response.data)
            setErrors(error.response.data)
          }
          console.log(error)
        };
    } 
  }      
  const [confirmSaving, setConfirmSaving] = useState(false)
  const [confirmGoingBack, setConfirmGoingBack] = useState(false)
  const navigate = useNavigate()

  return (
    <div>
      <div className='pageTitle spaceBelow'>Đăng ký tài khoản</div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} className='secondLayerBox shadowedBox' style={{overflow:'hidden'}}>
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
              <label htmlFor="dob">Tên:</label>
              <TextField
                  
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  error={errors.name ? true : false}
                  helperText={errors.name}
              />
              </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
          <FormControl fullWidth >
          <label htmlFor="dob">Email:</label>
          <TextField 
          
           
          type="email" name="email" 
           
          value={profile.email} onChange={handleChange}
          error={errors.email ? true : false}
                  helperText={errors.email} />
          </FormControl>

          </Grid>
          

          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
              <label htmlFor="dob">Username:</label>
              <TextField
                  
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  error={errors.username ? true : false}
                  helperText={errors.username}
              />
              </FormControl>
          </Grid>

                      
                    
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
              <label htmlFor="dob">Mật khẩu:</label>
              <TextField
                  type="password"
                  name="password"
                  
                  value={profile.password}
                  onChange={handleChange}
                  error={errors.password ? true : false}
                  helperText={errors.password}
              />
              </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
              <label htmlFor="dob">Địa chỉ:</label>
              <TextField
                  type="text"
                  name="address"
                  
                  value={profile.address}
                  onChange={handleChange}
                  error={errors.address ? true : false}
                  helperText={errors.address}
              />
              </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
              <label htmlFor="dob">Số điện thoại:</label>
              <TextField
                  type="tel"
                  name="phone"
                  
                  value={profile.phone}
                  onChange={handleChange}
                  error={errors.phone ? true : false}
                  helperText={errors.phone}
              />
              </FormControl>
          </Grid>
          
          <Grid item container justifyContent="center">
            <GreenButton variant="contained" onClick={() => setConfirmSaving(!confirmSaving)}>
                Đăng ký
            </GreenButton>
            <RedButton variant="contained" onClick={() => setConfirmGoingBack(!confirmGoingBack)}>
                Thoát
            </RedButton>            
          </Grid>                                                                       
        </Grid>
      </form>
      <ConfirmDialog 
        isOpen={confirmSaving} 
        setOpen={setConfirmSaving} 
        content="Bạn chắc chắn muốn đăng ký?"
        confirm={handleSubmit}
      /> 
      <ConfirmDialog 
        isOpen={confirmGoingBack} 
        setOpen={setConfirmGoingBack} 
        content="Bạn chắc chắn muốn thoát? Tất cả mọi thay đổi sẽ bị hủy bỏ"
        confirm={() => {navigate(-1)}}
      />            
    </div>
  );
};

export default Register;

