
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
// import axios from 'axios';
import './ModalLogin.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // try {
    //   const response = await axios.post('/api/register', formData);
    //   console.log(response.data);
    //   // Add code here to handle successful registration
    // } catch (error) {
    //   console.error(error);
    //   // Add code here to handle error
    // }
  };

  return (
    <div className="register">
      <h2>Đăng ký tài khoản mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Họ và Tên</label>
          <input type="text" name="name" placeholder='Nhập họ và tên' value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder='example@gmail.com' value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}><button type="submit" className="btn-reg">Đăng ký</button></div>
      </form>
    </div>
  );
}

export default Register;

