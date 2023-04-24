import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
const Layout = () => {
  return (
    <div className="container-fluid d-flex flex-column min-vh-100">
      <div className="row flex-grow-0">
        <Header/>
      </div>
      <div className="row flex-grow-1">
        <Outlet />
      </div>
      <div className="row flex-grow-0">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
