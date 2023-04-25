import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch } from "react-redux";
import { login } from "../actions/userRole";

const Login = () => {
  const dispatch = useDispatch();
  const [loginCredential, setLoginCredential] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState(loginCredential);
  const navigate = useNavigate()

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
          // console.log(response)
          dispatch(login(response.data.role))
          navigate(-1);
        } catch (error) {
          if (error.response.status === 401) {
            setErrors({...errors, password: "Tên đăng nhập hoặc mật khẩu không đúng"})
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
    <>
      <Meta title={"Đăng nhập"} />
      <BreadCrumb title="Đăng nhập" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Đăng nhập</h3>
              <form className="d-flex flex-column gap-15">
                <div className="w-100">
                  <input 
                    name="username"
                    value={loginCredential.username}
                    onChange={handleChange}                
                    placeholder="Username" 
                    className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
                <div className="w-100">
                  <input
                    type='password'
                    name="password"
                    value={loginCredential.password}
                    onChange={handleChange}
                    placeholder="Mật khẩu"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}              
                </div>  
                <div>
                  <Link to="/forgot-password">Quên mật khẩu?</Link>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit" onClick={handleSubmit}>
                      Đăng nhập
                    </button>
                  </div>
                  <div style={{fontSize: '14px'}} className="mt-1 text-center">
                    Chưa có tài khoản?&nbsp;
                    <Link to="/signup">
                      Đăng ký
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

export default Login;
