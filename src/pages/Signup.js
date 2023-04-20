import React, {useState} from "react";
import axios from "axios";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { useNavigate, Link } from "react-router-dom";
import Container from "../components/Container";
import {checkValidName, checkValidUsername, checkValidPass, checkValidEmail, checkValidPhoneNumber} from '../webpages/FormUtil'
import { useDispatch } from "react-redux";
import { login } from "../actions/userRole";

// tài khoản mẫu:
// user: user Bkhoa123@
// user: user1 Bkhoa456@
// admin: admin Bkhoa456@
// user: user123 Bkhoa456@
// user: bachkhoa Bkhoa456@
// user: khmt Bkhoa456@

const Signup = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    password: '',
    phone:'',
    email: '',
    address:''
  });
  const [errors, setErrors] = useState(profile)
  const navigate = useNavigate()  
  
  const handleChange = (e) => {
      const { name, value } = e.target;
      setProfile((prevState) => ({ ...prevState, [name]: value }));
      // if there is any warning, turn it off
      if (errors[name]) {
          errors[name] = ''
      }
  };   


  const handleSubmit = async (e) => {
    e.preventDefault()

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
        errors.phone = "SĐT không hợp lệ"

    if (trimmedInfo.address.length > 255) 
      errors.address = "Địa chỉ tối đa 255 ký tự"

    // Set errors if any, else submit form
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});   
    } else {
        try {
          const response = await axios.post('http://localhost/api/register.php', trimmedInfo)
          dispatch(login('0')) // default is 0 (user)
          navigate(-1)
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
  return (
    <>
      <Meta title={"Đăng ký"} />
      <BreadCrumb title="Đăng ký" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Đăng ký</h3>
              <form action="" className="d-flex flex-column gap-15">
                <input 
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Tên"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
                <input             
                  type="email" 
                  name="email" 
                  value={profile.email} 
                  onChange={handleChange} 
                  placeholder="Email" 
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
                <input             
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  placeholder="Username" 
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}            
                <input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                  placeholder="Mật khẩu"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
                <input             
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  placeholder="Địa chỉ" 
                  className={`form-control ${errors.address ? "is-invalid" : ""}`}
                />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address}</div>
                )}               

                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Số điện thoại"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit" onClick={handleSubmit}>
                      Đăng ký
                    </button>
                  </div>
                  <div>
                    Đã có tài khoản? 
                    <Link to="/login">
                      Đăng nhập
                    </Link>                    
                  </div>                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
