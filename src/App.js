import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CatalogSearch from "./pages/CatalogSearch";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Signup from "./pages/Signup";
import Resetpassword from "./pages/Resetpassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermAndContions from "./pages/TermAndContions";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ViewProfile from "./pages/user-page/ViewProfile";
import EditProfile from "./pages/user-page/EditProfile";
import UserOrdersList from "./pages/user-page/UserOrdersList";
import Order from "./pages/user-page/Order";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminEditProduct from "./pages/admin/AdminEditProduct";
import AdminManageProductInfo from "./pages/admin/AdminManageProductInfo";
import AdminCommentsList from "./pages/admin/AdminCommentsList";
import AdminOrdersList from "./pages/admin/AdminOrdersList";
import AdminProductsList from "./pages/admin/AdminProductsList";
import UsersAdminPage from "./pages/admin/AdminUsersList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="catalog-search/:q?" element={<CatalogSearch />} />
            <Route path="contact" element={<Contact />} />
            <Route path="category/:unique_name" element={<OurStore />} />
            <Route path="product/:unique_name" element={<SingleProduct />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<Forgotpassword />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password" element={<Resetpassword />} />
            <Route path="view-profile" element={<ViewProfile />} />
            <Route path="edit-profile" element={<EditProfile />} /> 
            <Route path="orders/order/:id?" element={<Order />} /> 
            <Route path="orders" element={<UserOrdersList />} /> 
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="term-conditions" element={<TermAndContions />} />
            <Route path="admin">
              <Route path="products" element={<AdminProductsList/>}/>
              <Route path="products/add" element={<AdminAddProduct/>}/>
              <Route path="products/edit/:id?" element={<AdminEditProduct/>}/>
              <Route path="products/info" element={<AdminManageProductInfo/>}/>
              <Route path="comments" element={<AdminCommentsList/>}/>
              <Route path="orders" element={<AdminOrdersList/>}/>
              <Route path="users" element={<UsersAdminPage/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
