import React, { useState } from 'react';
import { Grid, FormControl, TextField } from '@mui/material';
import { GreenButton } from '../button-theme/ButtonTheme';

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
  const handleSubmit = (event) => {
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
    setErrors(errors)

    console.log('Username: ' + trimmedLoginCre.username.length);
    console.log('Password: ' + trimmedLoginCre.password.length);
    // Thực hiện xử lý đăng nhập ở đây
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



