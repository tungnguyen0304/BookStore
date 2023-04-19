import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
// import About from "./pages/About";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
// import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
// import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Signup from "./pages/Signup";
import Resetpassword from "./pages/Resetpassword";
// import SingleBlog from "./pages/SingleBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPloicy from "./pages/RefundPloicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermAndContions from "./pages/TermAndContions";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ViewProfile from "./webpages/user-page/ViewProfile";
import EditProfile from "./webpages/user-page/EditProfile";
import AdminAddProduct from "./webpages/admin/AdminAddProduct";
import AdminEditProduct from "./webpages/admin/AdminEditProduct";
import AdminManageProductInfo from "./webpages/admin/AdminManageProductInfo";
import AdminCommentsList from "./webpages/admin/AdminCommentsList";
import AdminDashboard from "./webpages/admin/AdminDashboard";
import AdminOrdersList from "./webpages/admin/AdminOrdersList";
import AdminProductsList from "./webpages/admin/AdminProductsList";
import UsersAdminPage from "./webpages/admin/AdminUsersList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path="about" element={<About />} /> */}
            <Route path="contact" element={<Contact />} />
            <Route path="category/:unique_name" element={<OurStore />} />
            <Route path="product/:unique_name" element={<SingleProduct />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="compare-product" element={<CompareProduct />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<Forgotpassword />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password" element={<Resetpassword />} />
            <Route path="view-profile" element={<ViewProfile />} />
            <Route path="edit-profile" element={<EditProfile />} /> 
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPloicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="term-conditions" element={<TermAndContions />} />
            <Route path="admin">
              <Route index element={<AdminDashboard/>}/>
              <Route path="products" element={<AdminProductsList/>}/>
              <Route path="products/add" element={<AdminAddProduct/>}/>
              <Route path="products/edit?:id" element={<AdminEditProduct/>}/>
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
