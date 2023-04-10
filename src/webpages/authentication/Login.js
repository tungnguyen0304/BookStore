import React, { useState } from 'react';
import axios from 'axios';
import { Grid, FormControl, TextField } from '@mui/material';
import { GreenButton } from '../button-theme/ButtonTheme';
import Cookies from 'js-cookie'

function Login() {
  const [loginCredential, setLoginCredential] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  // Hàm xử lý khi người dùng nhấn nút đăng nhập
  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedLoginCre = ({
      username: loginCredential.username.trim(), 
      password: loginCredential.password.trim()
    })

    const errors = {}
    if (trimmedLoginCre.username.length === 0) {
      errors.username = "Vui lòng điền username"
    }
    if (trimmedLoginCre.password.length === 0) {
      errors.password = "Vui lòng điền mật khẩu"
    }

    // Set errors if any, else submit form
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});   
    } else {
        try {
          const response = await axios.post('http://localhost/api/verify-login.php', trimmedLoginCre)
          Cookies.set('role', response.data.role, { expires: 1/24 })
          // console.log(response)
          window.location.href = '/'
        } catch (error) {
          if (error.response.status === 401) {
            setErrors({...errors, password: "Không đúng mật khẩu"})
          } else {
            console.log(error)
          }
        };
    } 
  };

  // Hàm xử lý khi người dùng thay đổi tên đăng nhập hoặc mật khẩu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginCredential((prevState) => ({ ...prevState, [name]: value }));
    // if there is any warning, turn it off
    if (errors[name]) {
      errors[name] = ''
    }
  };

  return (
    <div>
      <div className='pageTitle'>Đăng nhập</div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} className='secondLayerBox shadowedBox' justifyContent="center" alignItems="center">
          <Grid item xs={7}>
            <FormControl fullWidth >
            <TextField
                label="Username"
                name="username"
                value={loginCredential.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
            />
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <FormControl fullWidth >
            <TextField
                label="Mật khẩu"
                type='password'
                name="password"
                value={loginCredential.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
            />
            </FormControl>
          </Grid>   
          <Grid item container justifyContent="center">
            <GreenButton type="submit" variant="contained">
                Đăng nhập
            </GreenButton>
          </Grid>                  
        </Grid>
      </form>
    </div>
  )
}

export default Login;



