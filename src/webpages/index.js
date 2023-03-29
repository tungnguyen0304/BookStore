import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import Home from './home/Home';
import NotFound from './error/NotFound';
import ProductOrCategoryNavigator from './ProductOrCategoryNavigator';
import Cart from './cart-payment/Cart';
import Payment from './cart-payment/Payment';
import ModalLogin from './authentication/ModalLogin';
import Register from './authentication/Register';
import ViewProfile from './user-page/ViewProfile';
import EditProfile from './user-page/EditProfile';
import UserOrdersList from './user-page/UserOrdersList';
import Order from './user-page/Order';
import AdminDashboard from './admin/AdminDashboard';
import AdminUsersList from './admin/AdminUsersList';
import AdminCommentsList from './admin/AdminCommentsList';
// import AdminContacts from './admin/AdminContacts';
import AdminProductsList from './admin/AdminProductsList';
import AdminEditProduct from './admin/AdminEditProduct';
import AdminAddProduct from './admin/AdminAddProduct';
import AdminOrdersList from './admin/AdminOrdersList';
import './index.css';

const userInfo = {
    id: '123',
    username: 'vana',
    name: 'Nguyen Van A',
    role: '1', // user
    phone: '0909090920',
    email: 'abc@hcmut.edu.vn',
    address: '474374, Bach Khoa',
}
localStorage.setItem("user", JSON.stringify(userInfo)); // it's retrieved from server after login / register

export default function Webpages () {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/cart/payment" element={<Payment/>} />
            <Route path="/login" element={<ModalLogin/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/view_profile" element={<ViewProfile/>} />
            <Route path="/edit_profile" element={<EditProfile/>} />
            <Route path="/orders" element={<UserOrdersList/>} />
            <Route path="/orders/order/:filterParams?" element={<Order/>} />
            <Route path="/admin" element={<AdminDashboard/>} />
            <Route path="/admin/users" element={<AdminUsersList/>} />
            <Route path="/admin/comments" element={<AdminCommentsList/>} />
            {/* <Route path="/admin/contacts" element={<AdminContacts/>} /> */}
            <Route path="/admin/products" element={<AdminProductsList/>} />
            <Route path="/admin/products/edit/:id?" element={<AdminEditProduct/>} />
            <Route path="/admin/products/add" element={<AdminAddProduct/>} />
            <Route path="/admin/orders" element={<AdminOrdersList/>} />    
            <Route path="/admin/orders/order/:id?" element={<Order/>} />
            <Route path="/:name" element={<ProductOrCategoryNavigator/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
        </Router>
    );
};