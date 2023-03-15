import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import Home from './home/Home';
import NotFound from './error/NotFound';
import PostsList from './post/PostsList';
import ViewPost from './post/ViewPost';
import ProductOrCategoryNavigator from './ProductOrCategoryNavigator';
import Cart from './cart-payment/Cart';
import Payment from './cart-payment/Payment';
import Login from './authentication/Login';
import Register from './authentication/Register';
import ViewProfile from './user-page/ViewProfile';
import EditProfile from './user-page/EditProfile';
import UserOrdersList from './user-page/UserOrdersList';
import Order from './user-page/Order';
import AdminDashboard from './admin/AdminDashboard';
import AdminUsersList from './admin/AdminUsersList';
import AdminCommentsList from './admin/AdminCommentsList';
import AdminContacts from './admin/AdminContacts';
import AdminProductsList from './admin/AdminProductsList';
import AdminEditProduct from './admin/AdminEditProduct';
import AdminAddProduct from './admin/AdminAddProduct';
import AdminOrdersList from './admin/AdminOrdersList';
import AdminPostsList from './admin/AdminPostsList';
import AdminEditPost from './admin/AdminEditPost';
import AdminAddPost from './admin/AdminAddPost';
import './index.css';


export default function Webpages () {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/posts" element={<PostsList/>} />
            <Route path="/post" element={<ViewPost/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/cart/payment" element={<Payment/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/view_profile" element={<ViewProfile/>} />
            <Route path="/edit_profile" element={<EditProfile/>} />
            <Route path="/orders" element={<UserOrdersList/>} />
            <Route path="/orders/order" element={<Order/>} />
            <Route path="/admin" element={<AdminDashboard/>} />
            <Route path="/admin/users" element={<AdminUsersList/>} />
            <Route path="/admin/comments" element={<AdminCommentsList/>} />
            <Route path="/admin/contacts" element={<AdminContacts/>} />
            <Route path="/admin/products" element={<AdminProductsList/>} />
            <Route path="/admin/products/edit" element={<AdminEditProduct/>} />
            <Route path="/admin/products/add" element={<AdminAddProduct/>} />
            <Route path="/admin/orders" element={<AdminOrdersList/>} />    
            <Route path="/admin/orders/order" element={<Order/>} />
            <Route path="/admin/posts" element={<AdminPostsList/>} />
            <Route path="/admin/posts/edit" element={<AdminEditPost/>} />    
            <Route path="/admin/posts/add" element={<AdminAddPost/>} />                        
            <Route path="/:name" element={<ProductOrCategoryNavigator/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
        </Router>
    );
};