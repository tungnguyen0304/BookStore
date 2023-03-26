import React, { useState } from 'react';
import './ModalLogin.css';
import {FaFacebook,FaTwitter,FaGoogle} from "react-icons/fa"
import { width } from '@mui/system';

function ModalLogin(props) {
  // Khai báo state cho tên đăng nhập và mật khẩu
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Hàm xử lý khi người dùng nhấn nút đăng nhập
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username: ' + username);
    console.log('Password: ' + password);
    // Thực hiện xử lý đăng nhập ở đây
  };

  // Hàm xử lý khi người dùng thay đổi tên đăng nhập hoặc mật khẩu
  const handleChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{width:"101px"}} htmlFor="username">Tên đăng nhập:</label>
            <input style={{margin:"0 0 0 6px"}} type="text" name="username" placeholder='Username or email' value={username} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label style={{width:"101px"}} htmlFor="password">Mật khẩu:</label>
            <input type="password" name="password" placeholder='Password' value={password} onChange={handleChange} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Đăng nhập</button>
            
          </div>
          <div className="border-solid"><span className="border-solid-text">hoặc đăng nhập bằng</span></div>
          <div className="form-login-fb-tw-gg">
              <div>
              <button className="login-fb-tw-gg back-gr-fb">
              <span className="x32-32 back-gr-fb-icon"><FaFacebook className="color-icon"></FaFacebook></span>
              <div className="login-text">LOGIN WITH FACEBOOK</div>
              </button>
              </div>
              <div>
              <button className="login-fb-tw-gg back-gr-tw">
              <span className="x32-32 back-gr-tw-icon"><FaTwitter className="color-icon"></FaTwitter></span>
              <div className="login-text">LOGIN WITH TWITTER</div>
              </button>
              </div>
              <div>
              <button className="login-fb-tw-gg back-gr-gg">
              <span className="x32-32 back-gr-gg-icon"><FaGoogle className="color-icon"></FaGoogle></span>
              <div className="login-text">LOGIN WITH GOOGLE</div>
              </button>
              </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalLogin;



