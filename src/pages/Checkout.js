import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import Meta from "../components/Meta";
import OrderItems from "../webpages/user-page/OrderItem";
import { getLocalCartContent } from '../webpages/cart-payment/setCartLocal';
import { checkValidName, checkValidPhoneNumber } from '../webpages/FormUtil';

const Checkout = () => {
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
    <>
      <Meta title={"Thanh toán"} />
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="w-100">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/cart" className="text-dark">
              <BiArrowBack className="me-2" />
              Trở về giỏ hàng
            </Link>
          </div>
        </div>          
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h4 className="mb-3">Thông tin nhận hàng</h4>
              <form
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                <input
                  name="name"
                  value={info.name}
                  onChange={handleChange}
                  placeholder="Tên người nhận hàng"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
                </div>
                <div className="w-100">
                  <input
                    name="phone"
                    value={info.phone}
                    onChange={handleChange}
                    placeholder="Số điện thoại"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>
                <div className="w-100">
                  <input
                    name="address"
                    value={info.address}
                    onChange={handleChange}
                    placeholder="Địa chỉ nhận hàng"
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>
              </form>
              <h4 className="mb-3">Phương thức thanh toán</h4>
              <form>
                <div className="w-100">
                  {methods.map(option => (
                    <div key={option.value} className="form-check form-check-inline d-block">
                      <input
                        className={`form-check-input ${errors.method ? "is-invalid" : ""}`}
                        name="method"
                        type="radio"
                        value={option.value}
                        checked={info.method === option.value}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">{option.text}</label>
                    </div>
                  ))}
                  {errors.method && (
                    <div className="invalid-feedback">{errors.method}</div>
                  )}
                </div>
              </form>        
            </div>
          </div>
          <div className="col-5">
            {cartContent.map((product) => (
              <OrderItems key={product.ID} product={product}/>
            ))}            
            <div className="d-flex flex-column align-items-end">
              Thành tiền: {VNCurrencyFormatter.format(subtotal)}<br/>
              Phí vận chuyển: {VNCurrencyFormatter.format(deliveryCost)}<br/>
              <strong>Tổng tiền: {VNCurrencyFormatter.format(total)}</strong>
              <button onClick={handleSubmit} className="button border-0">
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
