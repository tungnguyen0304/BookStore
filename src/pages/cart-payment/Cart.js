import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { useState } from "react";
import {getLocalCartContent, decreaseInLocalCart, increaseInLocalCart, removeFromLocalCart} from '../../utils/setCartLocal';
import CartItem from "../../components/CartItem";
import EmptyCart from '../../images/empty-cart.jpg'

const Cart = () => {
  const [cartContent, setCartContent] = useState(getLocalCartContent())
  const onIncrease = (product) => {
    const exist = cartContent.find((x) => x.ID === product.ID);
    if (exist) {
      setCartContent(
        cartContent.map((x) =>
          x.ID === product.ID ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartContent([...cartContent, { ...product, qty: 1 }])
    }
    increaseInLocalCart(product)
    // console.log(getLocalCartContent())
  }
  const onDecrease = (product) => {
    const exist = cartContent.find((x) => x.ID === product.ID);
    if (exist.qty === 1) {
      setCartContent(cartContent.filter((x) => x.ID !== product.ID));
    } else {
      setCartContent(
        cartContent.map((x) =>
          x.ID === product.ID ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
    decreaseInLocalCart(product)
    // console.log(getLocalCartContent())
  };    
  const onDelete = (product) => {
    setCartContent(cartContent.filter((x) => x.ID !== product.ID));
    removeFromLocalCart(product)
    // console.log(getLocalCartContent())
  };
  const subtotal = cartContent.reduce((acc, product) => acc + product.qty * product.price, 0)
  const deliveryCost = 15000
  const total = subtotal + deliveryCost
  const VNCurrencyFormatter = new Intl.NumberFormat('vi', {
    style: "currency",
    currency: "VND"
  })

  return (
    <>
      <Meta title={"Giỏ hàng"} />
      <BreadCrumb title="Giỏ hàng" />
      {cartContent.length !== 0 ? (
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            {cartContent.map((product) => (
              <CartItem key={product.ID} product={product} onIncrease={onIncrease} onDecrease={onDecrease} onDelete={onDelete}/>
            ))}  
          </div>
          <div className="py-2 mt-4">
              <div className="d-flex flex-column align-items-end">
                <span>Thành tiền: {VNCurrencyFormatter.format(subtotal)}</span>
                <span>Phí vận chuyển: {VNCurrencyFormatter.format(deliveryCost)}</span>
                <strong>Tổng tiền: {VNCurrencyFormatter.format(total)}</strong>
                <Link to="/checkout" className="button my-2">
                  Thanh toán
                </Link>
              </div>
          </div>
        </div>
      </Container>
      ) : (
        <div>
          <img src={EmptyCart} style={{display:"block",width:"30%",margin:"auto"}} alt='Empty cart'/>
          <div style={{fontWeight:'bold',textAlign:'center'}}>Giỏ hàng trống</div>
        </div>
      )}
    </>
  );
};

export default Cart;
