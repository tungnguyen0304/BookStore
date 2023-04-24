import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
const Layout = () => {
  return (
    <div className="container-fluid d-flex flex-column min-vh-100 p-0">
      <div className="flex-grow-0 w-100">
        <Header/>
      </div>
      <div className="flex-grow-1 w-100">
        <Outlet />
      </div>
      <div className="flex-grow-0 w-100">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
